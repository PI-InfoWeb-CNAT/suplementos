from rest_framework import serializers
from django.contrib.auth.models import User
from powerUp.models import Cliente

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ClienteSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Cliente
        fields = ['id', 'user', 'perfil', 'nome', 'cpf', 'telefone_celular']
