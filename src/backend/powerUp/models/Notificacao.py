from powerUp.models import *

class Notificacao(models.Model):
    class Categorias(models.TextChoices):
        PEDIDO = 'status_pedido', 'Status do Pedido'
        DEVOLUCAO = 'status_devolucao', 'Status da Devolução'
        GERAL = 'mensagem_personalizada', 'Mensagem Geral'
        PROMOCAO = 'promocao', 'Promoção'
        SEGURANCA = 'seguranca', 'Segurança'

    cliente = models.ForeignKey(Cliente, related_name='notificacoes', on_delete=models.CASCADE, null=True, blank=True)
    categoria = models.CharField(max_length=50, choices=Categorias.choices, default=Categorias.GERAL)
    titulo = models.CharField(null=False, max_length=100)
    texto = models.TextField(null=False)
    data_envio = models.DateTimeField(auto_now_add=True)
    lida = models.BooleanField(default=False)

    class Meta:
        ordering = ['-data_envio']
        
    def __str__(self):
        return f'{self.titulo} - {self.cliente}'