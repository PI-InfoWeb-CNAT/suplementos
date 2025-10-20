from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from powerUp.models import Carrinho, CarrinhoItem, Produto
from powerUp.serializers.CarrinhoSerializer import CarrinhoSerializer


class CarrinhoAPIView(APIView):
    def get(self, request):
        user = request.user if request.user.is_authenticated else None
        session_key = request.session.session_key or request.session.create()

        carrinho = Carrinho.objects.filter(
            user=user,
            session_key=None if user else session_key
        ).first()

        if not carrinho:
            return Response({"total_itens": 0}, status=status.HTTP_200_OK)

        total_itens = sum(item.quantidade for item in carrinho.itens.all())
        serializer = CarrinhoSerializer(carrinho, context={"request": request})

        return Response({
            "total_itens": total_itens,
            "carrinho": serializer.data
        }, status=status.HTTP_200_OK)

    def post(self, request):
        produto_id = request.data.get('produto')
        quantidade = int(request.data.get('quantidade', 1))

        user = request.user if request.user.is_authenticated else None
        session_key = request.session.session_key or request.session.create()

        produto = get_object_or_404(Produto, id=produto_id)

        # Cria ou obtém carrinho
        carrinho, _ = Carrinho.objects.get_or_create(
            user=user,
            session_key=None if user else session_key
        )

        # Cria ou atualiza item
        item, created = CarrinhoItem.objects.get_or_create(
            carrinho=carrinho,
            produto=produto,
            defaults={
                'quantidade': quantidade,
                'preco': produto.preco,
                'imagem': produto.imagem.url if produto.imagem else None,
            }
        )

        if not created:
            item.quantidade += quantidade
            item.save()

        serializer = CarrinhoSerializer(carrinho)
        return Response(serializer.data, status=status.HTTP_200_OK)