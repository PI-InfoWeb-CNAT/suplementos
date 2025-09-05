# powerUp/views/RedefinirSenhaView.py
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from powerUp.serializers.RedefinirSenhaSerializer import RedefinirSenhaSerializer

class RedefinirSenhaView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        serializer = RedefinirSenhaSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Senha alterada com sucesso"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
