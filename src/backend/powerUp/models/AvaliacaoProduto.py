from powerUp.models import *
from django.core.validators import MinValueValidator, MaxValueValidator

class AvaliacaoProduto(models.Model):
    nota = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    data_avaliacao = models.DateTimeField(auto_now_add=True)
    cliente = models.ForeignKey(Cliente, related_name='avaliacoes', on_delete=models.CASCADE)
    produto = models.ForeignKey(Produto, related_name='avaliacoes',on_delete=models.CASCADE)

    class Meta:
        unique_together = [['cliente', 'produto']]
        ordering = ['-data_avaliacao'] 
        
    def __str__(self):
        return f'{self.produto.nome} - {self.nota} estrelas - {self.cliente.nome}'