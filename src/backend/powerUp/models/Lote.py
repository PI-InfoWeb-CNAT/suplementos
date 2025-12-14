from powerUp.models import *

class Lote(models.Model):
    produto = models.ForeignKey(Produto, related_name='lotes', on_delete=models.CASCADE)
    quantidade = models.PositiveIntegerField()
    validade = models.DateField(null=True, blank=True)
    data_entrada = models.DateField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.quantidade <= 0:
            if self.pk:
                self.delete()
            return 
        
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"Lote {self.id} - {self.produto.nome} ({self.quantidade})"