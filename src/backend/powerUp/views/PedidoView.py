import json
from rest_framework import viewsets, mixins, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action 
from django.db import transaction
from django.db.models import Sum, F, Q
from django.utils import timezone
from decimal import Decimal

from powerUp.models import Carrinho, Pedido, PedidoItem, Endereco, Cartao, SolicitacaoDevolucao, ItemDevolvido, Lote
from powerUp.serializers.PedidoSerializer import PedidoSerializer
from powerUp.serializers.DevolucaoSerializer import SolicitacaoDevolucaoSerializer

class PedidoViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = PedidoSerializer

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'cliente') and user.cliente.perfil == 'admin':
            return Pedido.objects.all().order_by('-dt_hora')
        return Pedido.objects.filter(user=user).order_by('-dt_hora')

    def create(self, request, *args, **kwargs):
        user = request.user
        endereco_id = request.data.get('endereco')
        cartao_id = request.data.get('cartao')

        carrinho = Carrinho.objects.filter(user=user).first()
        if not carrinho or not carrinho.itens.exists():
            return Response({"erro": "Carrinho vazio ou não encontrado."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            endereco = Endereco.objects.get(id=endereco_id, cliente__user=user)
        except Endereco.DoesNotExist:
            return Response({"erro": "Endereço inválido ou não pertence ao usuário."}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            cartao = Cartao.objects.get(id=cartao_id, cliente__user=user)
        except Cartao.DoesNotExist:
            return Response({"erro": "Cartão inválido ou não pertence ao usuário."}, status=status.HTTP_403_FORBIDDEN)

        try:
            with transaction.atomic():
                total = Decimal('0.00')
                itens_carrinho = list(carrinho.itens.select_related('produto').all())
                
                for item in itens_carrinho:
                    preco_atual = Decimal(str(item.produto.preco_calculado()))
                    total += preco_atual * Decimal(item.quantidade)

                pedido = Pedido.objects.create(
                    user=user,
                    endereco=endereco,
                    cartao=cartao,
                    total=round(total, 2),
                    status='1'
                )

                for item_carrinho in itens_carrinho:
                    produto = item_carrinho.produto
                    qtd_necessaria = item_carrinho.quantidade

                    hoje = timezone.now().date()
                    
                    lotes_query = Lote.objects.select_for_update().filter(
                    produto=produto, 
                    quantidade__gt=0
                    ).filter(
                        Q(validade__gte=hoje) | Q(validade__isnull=True)
                    )

                    estoque_total = lotes_query.aggregate(soma=Sum('quantidade'))['soma'] or 0
                    if estoque_total < qtd_necessaria:
                        raise ValidationError(
                            {"erro": f"O produto '{produto.nome}' só tem {estoque_total} unidades disponíveis."}
                        )

                    lotes_ordenados = lotes_query.order_by(
                        F('validade').asc(nulls_last=True), 
                        'quantidade'
                    )

                    qtd_restante_para_abater = qtd_necessaria

                    for lote in lotes_ordenados:
                        if qtd_restante_para_abater <= 0:
                            break
                        
                        if lote.quantidade > qtd_restante_para_abater:
                            lote.quantidade -= qtd_restante_para_abater
                            lote.save()
                            qtd_restante_para_abater = 0
                        else:
                            qtd_abatida = lote.quantidade
                            lote.delete() 
                            qtd_restante_para_abater -= qtd_abatida

                    imagem = None
                    try:
                        if hasattr(produto, 'imagem') and produto.imagem:
                            imagem = getattr(produto.imagem, 'url', None) or str(produto.imagem)
                    except Exception:
                        imagem = None
                    
                    preco_atual = Decimal(str(produto.preco_calculado()))

                    PedidoItem.objects.create(
                        pedido=pedido, 
                        produto=produto, 
                        quantidade=qtd_necessaria, 
                        preco=preco_atual, 
                        imagem=imagem
                    )

                carrinho.itens.all().delete()
                
                serializer = self.get_serializer(pedido)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"erro": f"Erro ao processar pedido: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def cancelar(self, request, pk=None): 
        pedido = self.get_object() 

        if pedido.status != '1':
            return Response({"erro": "Este pedido não pode mais ser cancelado."}, status=status.HTTP_400_BAD_REQUEST)

        pedido.status = '5'
        pedido.save()
        serializer = self.get_serializer(pedido)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'])
    def confirmar_entrega(self, request, pk=None):
        pedido = self.get_object()

        if pedido.status != '3':
            return Response({"erro": "Este pedido não está na fase de confirmar entrega."}, status=status.HTTP_400_BAD_REQUEST)

        pedido.status = '4'
        pedido.save()
        serializer = self.get_serializer(pedido)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def solicitar_devolucao(self, request, pk=None):
        pedido = self.get_object()

        if pedido.status != '4':
            return Response(
                {"erro": "Este pedido não pode ter itens devolvidos (status não é 'Recebido')."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        motivo = request.data.get('motivo')
        arquivo = request.data.get('arquivo', None) 
        itens_json_string = request.data.get('itens')

        if not motivo or not itens_json_string:
            return Response({"erro": "Motivo e itens são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            itens_data = json.loads(itens_json_string) 
        except json.JSONDecodeError:
            return Response({"erro": "Formato de itens inválido."}, status=status.HTTP_400_BAD_REQUEST)

        itens_para_devolver = []
        for item_id_str, info in itens_data.items():
            if info.get('selected') and info.get('quantity', 0) > 0:
                try:
                    itens_para_devolver.append({
                        'pedido_item_id': int(item_id_str),
                        'quantidade': int(info.get('quantity'))
                    })
                except (ValueError, TypeError):
                     return Response({"erro": f"Dados inválidos para o item {item_id_str}."}, status=status.HTTP_400_BAD_REQUEST)
        
        if not itens_para_devolver:
            return Response({"erro": "Nenhum item válido foi selecionado para devolução."}, status=status.HTTP_400_BAD_REQUEST)

        solicitacao = SolicitacaoDevolucao.objects.create(pedido=pedido, user=request.user, motivo=motivo, arquivo=arquivo,  status='1')

        total_a_devolver = Decimal('0.00')

        for item_data in itens_para_devolver:
            pedido_item_id = item_data['pedido_item_id']
            quantidade = item_data['quantidade']
            
            try:
                pedido_item = PedidoItem.objects.get(id=pedido_item_id, pedido=pedido)
                
                if quantidade > pedido_item.quantidade:
                    solicitacao.delete() 
                    return Response({"erro": f"Quantidade inválida para o item {pedido_item.produto.nome}."}, status=status.HTTP_400_BAD_REQUEST)
                
                ItemDevolvido.objects.create(solicitacao=solicitacao, pedido_item=pedido_item, quantidade=quantidade)
                
                total_a_devolver += (Decimal(pedido_item.preco) * quantidade)
                
            except PedidoItem.DoesNotExist:
                solicitacao.delete() 
                return Response({"erro": "Item de pedido inválido ou não pertence a este pedido."}, status=status.HTTP_400_BAD_REQUEST)
            
        solicitacao.total = total_a_devolver
        solicitacao.save()

        serializer = SolicitacaoDevolucaoSerializer(solicitacao) 
        return Response(serializer.data, status=status.HTTP_201_CREATED)