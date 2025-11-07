from powerUp.models import *
from decimal import Decimal

class SolicitacaoDevolucao(models.Model):
    STATUS_DEVOLUCAO = [
        ('1', 'Pendente'),
        ('2', 'Aprovada'),
        ('3', 'Reembolsado'),
        ('4', 'Recusada'),
        ('5', 'Cancelada')
    ]

    pedido = models.ForeignKey(Pedido, related_name='devolucoes', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='devolucoes', on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=STATUS_DEVOLUCAO, default='1')
    motivo = models.TextField(null=False)
    arquivo = models.FileField(upload_to='devolucoes/', blank=True, null=True)
    data_solicitacao = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))

    def __str__(self):
        return f'Devolução do Pedido #{self.pedido.id} - Status: {self.get_status_display()}'


class ItemDevolvido(models.Model):
    solicitacao = models.ForeignKey(SolicitacaoDevolucao, related_name='itens', on_delete=models.CASCADE)
    pedido_item = models.ForeignKey(PedidoItem, related_name='itens_devolvidos', on_delete=models.CASCADE)
    quantidade = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.pedido_item.produto.nome} (Qtd: {self.quantidade})'

        