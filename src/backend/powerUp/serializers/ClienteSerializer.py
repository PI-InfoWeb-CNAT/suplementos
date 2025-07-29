from rest_framework import serializers
from django.contrib.auth.models import User
from powerUp.models import Cliente

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class ClienteSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Cliente
        fields = ['id', 'user', 'perfil', 'nome', 'cpf', 'telefone_celular']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        password = user_data.pop('password')

        if User.objects.filter(email=user_data.get('email')).exists():
            raise serializers.ValidationError({"email": "Este email já está em uso."})

        user = User(
            username=user_data.get('email'), 
            email=user_data.get('email')
        )
        user.set_password(password)
        user.save()

        # Criar o cliente associado
        cliente = Cliente.objects.create(user=user, **validated_data)
        return cliente
