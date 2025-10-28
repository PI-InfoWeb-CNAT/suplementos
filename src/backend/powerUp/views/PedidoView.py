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
            endereco = get_object_or_404(Endereco, id=endereco_id, user=user)

        if cartao_id:
            cartao = get_object_or_404(Cartao, id=cartao_id, user=user)

        total = Decimal('0.00')
        for item in carrinho.itens.all():
            preco = Decimal(str(item.preco))
            total += preco * Decimal(item.quantidade)

        pedido = Pedido.objects.create(
            user=user,
            endereco=endereco,
            cartao=cartao,
            total=round(total, 2),
            status='1'
        )

        for item in carrinho.itens.all():
            imagem = None
            try:
                # tenta pegar url da imagem, caso exista
                if hasattr(item.produto, 'imagem') and item.produto.imagem:
                    imagem = getattr(item.produto.imagem, 'url', None) or str(item.produto.imagem)
            except Exception:
                imagem = None

            PedidoItem.objects.create(
                pedido=pedido,
                produto=item.produto,
                quantidade=item.quantidade,
                preco=item.preco,
                imagem=imagem
            )

        # limpa carrinho
        carrinho.itens.all().delete()

        serializer = PedidoSerializer(pedido, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)
