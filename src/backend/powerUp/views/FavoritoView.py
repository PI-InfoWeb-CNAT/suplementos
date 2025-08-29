from powerUp.models import Favorito, Produto, Cliente
from powerUp.serializers import ProdutoSerializer
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

class FavoritoViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_cliente(self, user):
        return get_object_or_404(Cliente, user=user)  

    def list(self, request):
        cliente = self.get_cliente(request.user)
        favoritos = Favorito.objects.filter(cliente=cliente).select_related("produto")
        produtos = [f.produto for f in favoritos]
        serializer = ProdutoSerializer(produtos, many=True, context={"request": request})
        
        return Response(serializer.data)

    def create(self, request):
        cliente = self.get_cliente(request.user)
        produto_id = request.data.get("produto_id")
        produto = get_object_or_404(Produto, id=produto_id)

        favorito, created = Favorito.objects.get_or_create(cliente=cliente, produto=produto)
        if not created:
            return Response({"detail": "Já favoritado."}, status=status.HTTP_200_OK)
        return Response({"detail": "Adicionado aos favoritos."}, status=status.HTTP_201_CREATED)

    def destroy(self, request, pk=None):
        cliente = self.get_cliente(request.user)
        produto = get_object_or_404(Produto, id=pk)
        favorito = Favorito.objects.filter(cliente=cliente, produto=produto)
        
        if favorito.exists():
            favorito.delete()
            return Response({"detail": "Removido dos favoritos."}, status=status.HTTP_204_NO_CONTENT)
        
        return Response({"detail": "Não estava favoritado."}, status=status.HTTP_404_NOT_FOUND)
