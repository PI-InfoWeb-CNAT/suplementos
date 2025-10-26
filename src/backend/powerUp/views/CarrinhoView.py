from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated # Importe isso
from django.shortcuts import get_object_or_404
from powerUp.models import Carrinho, CarrinhoItem, Produto
from powerUp.serializers.CarrinhoSerializer import CarrinhoSerializer

class CarrinhoAPIView(APIView):
    permission_classes = [IsAuthenticated] 

    def get(self, request):
        user = request.user
        carrinho = Carrinho.objects.filter(user=user).first()

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

        user = request.user
        produto = get_object_or_404(Produto, id=produto_id)

        carrinho, _ = Carrinho.objects.get_or_create(user=user)
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
    
    def patch(self, request, item_id):
        user = request.user
        
        try:
            quantidade = int(request.data.get('quantidade'))
            if quantidade <= 0:
                raise ValueError()
        except (ValueError, TypeError):
            return Response(
                {"erro": "Quantidade inválida. Deve ser um número inteiro positivo."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        carrinho = Carrinho.objects.filter(user=user).first()
        if not carrinho:
            return Response({"detail": "Carrinho não encontrado."}, status=status.HTTP_404_NOT_FOUND)

        try:
            item = get_object_or_404(CarrinhoItem, id=item_id, carrinho=carrinho)
        except CarrinhoItem.DoesNotExist:
            return Response({"detail": "Item não encontrado no carrinho."}, status=status.HTTP_404_NOT_FOUND)

        item.quantidade = quantidade
        item.save()

        serializer = CarrinhoSerializer(carrinho, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    
    def delete(self, request, item_id):
        user = request.user
        carrinho = Carrinho.objects.filter(user=user).first()

        if not carrinho:
            return Response({"detail": "Carrinho não encontrado."}, status=status.HTTP_404_NOT_FOUND)

        item = get_object_or_404(CarrinhoItem, id=item_id, carrinho=carrinho)
        item.delete()

        serializer = CarrinhoSerializer(carrinho, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CarrinhoMigracaoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        itens_locais = request.data.get('itens')

        if not isinstance(itens_locais, list):
            return Response({"erro": "Formato de itens inválido."}, status=status.HTTP_400_BAD_REQUEST)

        carrinho_usuario, _ = Carrinho.objects.get_or_create(user=user)

        for item_data in itens_locais:
            produto_id = item_data.get('produto_id')
            quantidade = item_data.get('quantidade')

            if not produto_id or not quantidade:
                continue

            try:
                produto = Produto.objects.get(id=produto_id)
            except Produto.DoesNotExist:
                continue 

            item_carrinho, created = CarrinhoItem.objects.get_or_create(
                carrinho=carrinho_usuario,
                produto=produto,
                defaults={
                    'quantidade': quantidade,
                    'preco': produto.preco,
                }
            )

            if not created:
                item_carrinho.quantidade += int(quantidade)
                item_carrinho.save()

        serializer = CarrinhoSerializer(carrinho_usuario, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)