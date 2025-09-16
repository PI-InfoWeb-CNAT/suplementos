from rest_framework import serializers
from powerUp.models import Endereco, Cliente

class EnderecoSerializer(serializers.ModelSerializer):
    complemento = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    
    class Meta: 
        model = Endereco
        fields = ["id", "apelido", "destinatario", "cep", "uf", "cidade", "bairro", "rua", "numero", "complemento"]
        read_only_fields = ["cliente"]
        
    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user
        rua = validated_data.get("rua")
        numero = validated_data.get("numero")
        complemento = validated_data.get("complemento")
        
        try:
            cliente = Cliente.objects.get(user=user)
        except Cliente.DoesNotExist:
            raise serializers.ValidationError({"validacao": ["Cliente não encontrado para este usuário."]})
        
        if Endereco.objects.filter(cliente=cliente, rua=rua, numero=numero, complemento=complemento).exists():
            raise serializers.ValidationError({"validacao": ["Você já possui esse endereço."]})
        
        endereco = Endereco.objects.create(cliente=cliente, **validated_data)
        
        return endereco
    
    def update(self, instance, validated_data):
        rua = validated_data.get("rua", instance.rua)
        numero = validated_data.get("numero", instance.numero)
        complemento = validated_data.get("complemento", instance.complemento)

        if Endereco.objects.filter(cliente=instance.cliente, rua=rua, numero=numero, complemento=complemento).exclude(id=instance.id).exists():
            raise serializers.ValidationError({"validacao": ["Você já possui esse endereço."]})

        return super().update(instance, validated_data)