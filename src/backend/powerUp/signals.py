from django.db.models.signals import post_delete, post_save, pre_save
from django.dispatch import receiver
from .models import Cliente, Notificacao, Pedido, SolicitacaoDevolucao, Produto, Favorito, Lote

@receiver(post_delete, sender=Cliente)
def delete_user_with_cliente(sender, instance, **kwargs):
    if instance.user:
        instance.user.delete()

# NOTIFICAÇÃO DE BOAS VINDAS
@receiver(post_save, sender=Cliente)
def boas_vindas(sender, instance, created, **kwargs):
    if created:
        nome_usuario = instance.nome
        nome_display = nome_usuario.split(' ')[0].capitalize()
        
        Notificacao.objects.create(
            cliente=instance, 
            categoria=Notificacao.Categorias.GERAL,
            titulo="Bem-vindo à PowerUp!",
            texto=f"Olá, {nome_display}! Estamos muito felizes em ter você aqui.",
        )

# NOTIFICAÇÃO DE PEDIDO REALIZADO
@receiver(post_save, sender=Pedido)
def pedido_realizado(sender, instance, created, **kwargs):
    if created:
        try:
            cliente = Cliente.objects.get(user=instance.user)
            Notificacao.objects.create(
                cliente=cliente,
                categoria=Notificacao.Categorias.PEDIDO,
                titulo=f"Pedido #{instance.id} Realizado!",
                texto=f"Recebemos seu pedido com sucesso. Acesse a página de Meus Pedidos para mais detalhes.",
            )
        except Cliente.DoesNotExist:
            pass

# NOTIFICAÇÃO DE MUDANÇA NO STATUS DO PEDIDO
@receiver(post_save, sender=Pedido)
def mudanca_status_pedido(sender, instance, created, **kwargs):
    if not created:
        try:
            cliente_do_pedido = Cliente.objects.get(user=instance.user)
            
            status_atual_texto = instance.get_status_display()
            
            Notificacao.objects.create(
                cliente=cliente_do_pedido,
                categoria=Notificacao.Categorias.PEDIDO,
                titulo=f"Atualização do Pedido #{instance.id}",
                texto=f"O seu pedido teve o status alterado para: <strong class='text-black'>{status_atual_texto}</strong>. Para mais informações, acesse a página de Meus Pedidos.",
            )
        except Cliente.DoesNotExist:
            pass
        
# NOTIFICAÇÃO DE SOLICITAÇÃO DE DEVOLUÇÃO REALIZADA
@receiver(post_save, sender=SolicitacaoDevolucao)
def devolucao_recebida(sender, instance, created, **kwargs):
    if created:
        try:
            cliente = Cliente.objects.get(user=instance.user)
            Notificacao.objects.create(
                cliente=cliente,
                categoria=Notificacao.Categorias.DEVOLUCAO,
                titulo=f"Solicitação de Devolução #{instance.id}",
                texto=f"Recebemos sua solicitação referente ao pedido #{instance.pedido.id}. Acesse a página de Minhas Devoluções para mais informações.",
            )
        except Cliente.DoesNotExist:
            pass

# NOTIFICAÇÃO DE MUDANÇA NO STATUS DA SOLICITAÇÃO DE DEVOLUÇÃO
@receiver(post_save, sender=SolicitacaoDevolucao)
def mudanca_status_devolucao(sender, instance, created, **kwargs):
    if not created:
        try:
            cliente_da_devolucao = Cliente.objects.get(user=instance.user)
            
            status_atual_texto = instance.get_status_display()
            
            Notificacao.objects.create(
                cliente=cliente_da_devolucao,
                categoria=Notificacao.Categorias.DEVOLUCAO,
                titulo=f"Atualização da Devolução #{instance.id}",
                texto=f"A sua devolução teve o status alterado para: <strong class='text-black'>{status_atual_texto}</strong>. Para mais informações, acesse a página de Minhas Devoluções.",
            )
        except Cliente.DoesNotExist:
            pass

# CAPTURAR O DESCONTO ANTIGO DO PRODUTO PARA UTILIZAR NA PRÓXIMA FUNÇÃO
@receiver(pre_save, sender=Produto)
def capturar_desconto_antigo(sender, instance, **kwargs):
    if instance.pk: 
        try:
            produto_antigo = Produto.objects.get(pk=instance.pk)
            instance._desconto_antigo = produto_antigo.porcentagem_desconto or 0
        except Produto.DoesNotExist:
            instance._desconto_antigo = 0
    else:
        instance._desconto_antigo = 0

# NOTIFICAÇÃO DO DESCONTO DE UM PRODUTO FAVORITADO PELO CLIENTE
@receiver(post_save, sender=Produto)
def notificar_promocao_favoritos(sender, instance, created, **kwargs):
    if not created and hasattr(instance, '_desconto_antigo'):
        
        novo_desconto = instance.porcentagem_desconto or 0
        desconto_antigo = instance._desconto_antigo

        if novo_desconto > 0 and novo_desconto > desconto_antigo:
            
            favoritos = Favorito.objects.filter(produto=instance).select_related('cliente')
            
            notificacoes_para_criar = []

            for favorito in favoritos:
                notificacao = Notificacao(
                    cliente=favorito.cliente,
                    categoria=Notificacao.Categorias.PROMOCAO, 
                    titulo="Opa! Item da sua lista baixou de preço! 🤑",
                    texto=(
                        f"O produto <strong>{instance.nome}</strong> entrou em oferta com "
                        f"<strong class='text-dark-green'>{novo_desconto}% de desconto</strong>! "
                        f"Aproveite antes que acabe."
                    ),
                )
                notificacoes_para_criar.append(notificacao)
            
            if notificacoes_para_criar:
                Notificacao.objects.bulk_create(notificacoes_para_criar)
                
# NOTIFICAÇÃO DE UM NOVO LOTE DO PRODUTO FAVORITADO PELO CLIENTE
@receiver(post_save, sender=Lote)
def notificar_reposicao_estoque(sender, instance, created, **kwargs):
    if created:
        produto = instance.produto
        
        favoritos = Favorito.objects.filter(produto=produto).select_related('cliente')
        
        notificacoes_para_criar = []

        for favorito in favoritos:
            notificacao = Notificacao(
                cliente=favorito.cliente,
                categoria=Notificacao.Categorias.PROMOCAO, 
                titulo="Produto de volta ao estoque! 📦",
                texto=(
                    f"Boas notícias! Novas unidades de <strong>{produto.nome}</strong> acabaram de chegar. "
                    f"Garanta o seu antes que acabe novamente."
                ),
            )
            notificacoes_para_criar.append(notificacao)
        
        if notificacoes_para_criar:
            Notificacao.objects.bulk_create(notificacoes_para_criar)