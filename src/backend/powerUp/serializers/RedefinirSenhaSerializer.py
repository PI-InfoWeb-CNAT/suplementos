from rest_framework import serializers

class RedefinirSenhaSerializer(serializers.Serializer):
    senha_atual = serializers.CharField(write_only=True, min_length=8)
    nova_senha = serializers.CharField(write_only=True, min_length=8)
    confirmacao_nova_senha = serializers.CharField(write_only=True, min_length=8)

    def validate_senha_atual(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Senha atual incorreta")
        return value

    def validate(self, data):
        if data['nova_senha'] != data['confirmacao_nova_senha']:
            raise serializers.ValidationError("A confirmação da nova senha não corresponde")
        if data['nova_senha'] == data['senha_atual']:
            raise serializers.ValidationError("A nova senha não pode ser igual à senha atual")
        return data

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['nova_senha'])
        user.save()
        return user