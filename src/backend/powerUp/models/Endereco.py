from powerUp.models import *

class Endereco(models.Model):
    cliente = models.ForeignKey(Cliente, related_name='enderecos', on_delete=models.CASCADE)
    apelido = models.CharField(null=False, max_length=100)
    destinatario = models.CharField(null=False, max_length=100)
    cep = models.CharField(null=False, max_length=10)
    uf = models.CharField(null=False, max_length=10)
    cidade = models.CharField(null=False, max_length=100)
    bairro = models.CharField(null=False, max_length=50)
    rua = models.CharField(null=False, max_length=200)
    numero = models.CharField(null=False, max_length=10)
    complemento = models.CharField(null=True, blank=True, max_length=255)

    def __str__(self):
        return f'{self.rua}, {self.numero} - {self.cidade}/{self.uf}'