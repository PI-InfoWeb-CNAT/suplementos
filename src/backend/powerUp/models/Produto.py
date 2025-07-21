from django.utils import timezone

from powerUp.models import *
from decimal import Decimal

class Produto(models.Model):
    CATEGORIAS = [
        ('suplementos', 'Suplementos'),
        ('alimentos', 'Alimentos'),
        ('roupas', 'Roupas'),
        ('acessorios', 'Acessórios'),
    ]
    nome = models.CharField(null=False, max_length=100)
    preco = models.FloatField(null=False)
    descricao = models.TextField(null=False)
    imagem = models.ImageField(null=False, blank=True, upload_to='produtos/')
    porcentagem_desconto = models.IntegerField(null=True, default=0)
    categoria = models.CharField(max_length=50, choices=CATEGORIAS, default='suplementos')

    def preco_calculado(self):
        if self.porcentagem_desconto == 0:
            return self.preco
        else:
            return Decimal(self.preco * (1 - (self.porcentagem_desconto / 100)))

    def __str__(self):
        return f'{self.nome}'
    
    class Meta:
        app_label = 'powerUp'