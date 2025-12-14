from powerUp.models import *
from decimal import Decimal
from django.db.models import Sum, Q
from django.utils import timezone

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
        
    @property
    def estoque(self):
        hoje = timezone.now().date()
        
        # Lógica: Vencimento >= Hoje OU Vencimento é Nulo (não perecível)
        return self.lotes.filter(
            Q(validade__gte=hoje) | Q(validade__isnull=True)
        ).aggregate(total=Sum('quantidade'))['total'] or 0

    def __str__(self):
        return f'{self.nome}'
    
    class Meta:
        app_label = 'powerUp'