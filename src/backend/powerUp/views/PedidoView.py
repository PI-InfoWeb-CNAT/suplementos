from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from decimal import Decimal

from powerUp.models import Carrinho, CarrinhoItem, Pedido, PedidoItem, Endereco, Cartao
from powerUp.serializers.PedidoSerializer import PedidoSerializer


class PedidoAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        pedidos = Pedido.objects.filter(user=user).order_by('-dt_hora')
        serializer = PedidoSerializer(pedidos, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        endereco_id = request.data.get('endereco')
        cartao_id = request.data.get('cartao')

        carrinho = Carrinho.objects.filter(user=user).first()
        if not carrinho or not carrinho.itens.exists():
            return Response({"erro": "Carrinho vazio ou não encontrado."}, status=status.HTTP_400_BAD_REQUEST)

        endereco = None
        cartao = None

        if endereco_id:
            endereco = get_object_or_404(Endereco, id=endereco_id)
            try:
                if endereco.cliente.user != user:
                    return Response({"erro": "Endereço não pertence ao usuário."}, status=status.HTTP_403_FORBIDDEN)
            except Exception:
                return Response({"erro": "Endereço inválido."}, status=status.HTTP_400_BAD_REQUEST)

        if cartao_id:
            cartao = get_object_or_404(Cartao, id=cartao_id)
            try:
                if cartao.cliente.user != user:
                    return Response({"erro": "Cartão não pertence ao usuário."}, status=status.HTTP_403_FORBIDDEN)
            except Exception:
                return Response({"erro": "Cartão inválido."}, status=status.HTTP_400_BAD_REQUEST)

        total = Decimal('0.00')
        itens = list(carrinho.itens.select_related('produto').all())
        for item in itens:
            preco_atual = Decimal(str(item.produto.preco_calculado()))
            total += preco_atual * Decimal(item.quantidade)

        pedido = Pedido.objects.create(
            user=user,
            endereco=endereco,
            cartao=cartao,
            total=round(total, 2),
            status='1'
        )

        for item in itens:
            imagem = None
            try:
                if hasattr(item.produto, 'imagem') and item.produto.imagem:
                    imagem = getattr(item.produto.imagem, 'url', None) or str(item.produto.imagem)
            except Exception:
                imagem = None

            preco_atual = Decimal(str(item.produto.preco_calculado()))

            PedidoItem.objects.create(
                pedido=pedido,
                produto=item.produto,
                quantidade=item.quantidade,
                preco=preco_atual,
                imagem=imagem
            )

        # limpa carrinho
        carrinho.itens.all().delete()

        serializer = PedidoSerializer(pedido, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CancelarPedidoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pedido_id):
        user = request.user
        pedido = get_object_or_404(Pedido, id=pedido_id)

        if pedido.user != user:
            return Response({"erro": "Pedido não pertence ao usuário."}, status=status.HTTP_403_FORBIDDEN)

        if pedido.status != '1':
            return Response({"erro": "Este pedido não pode mais ser cancelado."}, status=status.HTTP_400_BAD_REQUEST)

        pedido.status = '5'
        pedido.save()

        serializer = PedidoSerializer(pedido, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class ConfirmarEntregaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pedido_id):
        user = request.user
        pedido = get_object_or_404(Pedido, id=pedido_id)

        if pedido.user != user:
            return Response({"erro": "Pedido não pertence ao usuário."}, status=status.HTTP_403_FORBIDDEN)

        if pedido.status != '3':
            return Response({"erro": "Este pedido está na fase de confirmar entrega."}, status=status.HTTP_400_BAD_REQUEST)

        pedido.status = '4'
        pedido.save()

        serializer = PedidoSerializer(pedido, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)