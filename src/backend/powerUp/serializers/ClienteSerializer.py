from rest_framework import serializers
from django.contrib.auth.models import User
from powerUp.models import Cliente

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class ClienteSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)

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

        cliente = Cliente.objects.create(user=user, **validated_data)
        return cliente

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)

        instance.nome = validated_data.get('nome', instance.nome)
        instance.cpf = validated_data.get('cpf', instance.cpf)
        instance.telefone_celular = validated_data.get('telefone_celular', instance.telefone_celular)
        instance.save()

        if user_data:
            user = instance.user
            email = user_data.get('email')
            if email and email != user.email:
                if User.objects.filter(email=email).exclude(pk=user.pk).exists():
                    raise serializers.ValidationError({"email": "Este email já está em uso."})
                user.email = email
                user.username = email 
            if 'password' in user_data and user_data['password']:
                user.set_password(user_data['password'])
            user.save()

        return instance