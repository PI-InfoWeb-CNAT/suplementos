from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from powerUp.models import Carrinho, CarrinhoItem, Produto
from powerUp.serializers.CarrinhoSerializer import CarrinhoSerializer

class CarrinhoAPIView(APIView):
    def get(self, request):
        user = request.user if request.user.is_authenticated else None
        if not request.session.session_key:
            request.session.create()  # cria a sessão
        session_key = request.session.session_key  # agora pega a session key real

        print(session_key) 

        carrinho = Carrinho.objects.filter(
            user=user,
            session_key=None if user else session_key
        ).first()

        if not carrinho:
            return Response({
                "total_itens": 0,
                "carrinho": {
                    "itens": [],
                    "total": 0
                }
            }, status=status.HTTP_200_OK)

        total_itens = sum(item.quantidade for item in carrinho.itens.all())
        serializer = CarrinhoSerializer(carrinho, context={"request": request})

        return Response({
            "total_itens": total_itens,
            "carrinho": serializer.data
        }, status=status.HTTP_200_OK)

    def post(self, request):
        produto_id = request.data.get('produto')
        quantidade = int(request.data.get('quantidade', 1))

        if not produto_id:
            return Response({"erro": "Produto não informado."}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user if request.user.is_authenticated else None

        if not request.session.session_key:
            request.session.create()
        session_key = request.session.session_key

        produto = get_object_or_404(Produto, id=produto_id)

        carrinho, _ = Carrinho.objects.get_or_create(
            user=user,
            session_key=None if user else session_key
        )

        item, created = CarrinhoItem.objects.get_or_create(
            carrinho=carrinho,
            produto=produto,
            defaults={
                'quantidade': quantidade,
                'preco': produto.preco,
            }
        )

        if not created:
            item.quantidade += quantidade
            item.save()

        serializer = CarrinhoSerializer(carrinho, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    
    def delete(self, request, item_id):
        user = request.user if request.user.is_authenticated else None
        session_key = request.session.session_key or request.session.create()

        carrinho = Carrinho.objects.filter(
            user=user,
            session_key=None if user else session_key
        ).first()

        if not carrinho:
            return Response({"detail": "Carrinho não encontrado."}, status=status.HTTP_404_NOT_FOUND)

        item = get_object_or_404(CarrinhoItem, id=item_id, carrinho=carrinho)
        item.delete()

        serializer = CarrinhoSerializer(carrinho, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)