from powerUp.models import *

class Favorito(models.Model):
    cliente = models.ForeignKey(Cliente, related_name='favoritos', on_delete=models.CASCADE)
    produto = models.ForeignKey(Produto, related_name='favoritos',on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.cliente} - {self.produto}'