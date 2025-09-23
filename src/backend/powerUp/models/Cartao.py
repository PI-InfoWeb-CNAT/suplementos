from powerUp.models import *

class Cartao(models.Model):
    TIPOS = [
        ('debito', 'Débito'),
        ('credito', 'Crédito'),
    ]

    cliente = models.ForeignKey(Cliente, null=True, related_name='cartoes', on_delete=models.CASCADE, blank=True)
    apelido = models.CharField(null=False, max_length=100)
    titular = models.CharField(null=False, max_length=100)
    numero = models.CharField(null=False, max_length=100)
    bandeira = models.CharField(null=False, max_length=50)
    tipo = models.CharField(max_length=10, choices=TIPOS)

    def __str__(self):
        return f'{self.apelido} - {self.cliente}'