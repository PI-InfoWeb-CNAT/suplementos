import random
from datetime import timedelta
from decimal import Decimal
from django.core.management.base import BaseCommand
from django.utils import timezone
from django.db import transaction
from powerUp.models import Produto, Lote, Cliente, Pedido, PedidoItem

class Command(BaseCommand):
    help = 'Gera histórico de pedidos usando Clientes e Produtos já existentes'

    def handle(self, *args, **kwargs):
        self.stdout.write("--- INICIANDO GERAÇÃO DE PEDIDOS ---")
        
        # Verifica se existem dados prévios necessários
        if not Cliente.objects.exists() or not Produto.objects.exists():
            self.stdout.write(self.style.ERROR("ERRO: É necessário ter Clientes e Produtos cadastrados antes de gerar pedidos."))
            return

        with transaction.atomic():
            self.criar_pedidos()

        self.stdout.write(self.style.SUCCESS('--- PEDIDOS GERADOS COM SUCESSO! ---'))

    def criar_pedidos(self):
        self.stdout.write("Gerando 50 pedidos aleatórios...")
        
        clientes = list(Cliente.objects.all())
        produtos = list(Produto.objects.all())
        
        # Produtos "Mais Vendidos" (Whey e Creatina - IDs 1 e 2 no seu JSON original)
        # Ajuste os IDs aqui se no seu banco forem diferentes
        produtos_populares = [p for p in produtos if p.id in [1, 2]]

        # Status possíveis com pesos diferentes (Mais chance de estar Entregue ou Finalizado)
        # 1: Processando, 2: Enviado, 3: Entregue, 4: Finalizado, 5: Cancelado
        status_choices = ['1', '2', '3', '3', '4', '4', '4', '5'] 

        for i in range(50):
            # 1. Escolhe um cliente aleatório e seus dados
            cliente = random.choice(clientes)
            endereco = cliente.enderecos.first()
            cartao = cliente.cartoes.first()
            
            if not endereco or not cartao:
                continue # Pula cliente se faltar dados

            # 2. Define uma data aleatória nos últimos 60 dias
            dias_atras = random.randint(0, 60)
            data_pedido = timezone.now() - timedelta(days=dias_atras)

            # 3. Cria o Pedido (Total 0 inicial)
            pedido = Pedido.objects.create(
                user=cliente.user,
                endereco=endereco,
                cartao=cartao,
                total=0,
                status=random.choice(status_choices)
            )
            # Força a data retroativa
            pedido.dt_hora = data_pedido
            pedido.save()

            # 4. Escolhe os itens
            itens_pedido = []
            
            # 60% de chance de incluir um "Mais Vendido"
            if random.random() < 0.6 and produtos_populares:
                itens_pedido.append(random.choice(produtos_populares))
            
            # Adiciona mais 1 a 4 produtos aleatórios do catálogo geral
            qtd_extras = random.randint(1, 4)
            itens_pedido.extend(random.sample(produtos, min(len(produtos), qtd_extras)))
            
            # Remove duplicatas na lista de itens do mesmo pedido
            itens_pedido = list(set(itens_pedido))

            total_pedido = Decimal('0.00')

            # 5. Processa cada item (Baixa de Estoque simplificada)
            for produto in itens_pedido:
                # Quantidade aleatória (1 a 3). Se for popular, até 5.
                qtd = random.randint(1, 3)
                if produto.id in [1, 2]: 
                    qtd = random.randint(1, 5)

                # Busca lotes disponíveis (FIFO)
                lotes = Lote.objects.filter(produto=produto, quantidade__gt=0).order_by('validade')
                
                qtd_para_abater = qtd
                
                # Loop de baixa no estoque
                for lote in lotes:
                    if qtd_para_abater <= 0: break
                    
                    if lote.quantidade >= qtd_para_abater:
                        lote.quantidade -= qtd_para_abater
                        lote.save()
                        qtd_para_abater = 0
                    else:
                        qtd_para_abater -= lote.quantidade
                        lote.quantidade = 0 # Zera o lote
                        lote.save()

                # Calcula quanto realmente conseguiu comprar (caso falte estoque)
                qtd_final = qtd - qtd_para_abater 
                
                if qtd_final > 0:
                    try:
                        if hasattr(produto, 'preco_calculado'):
                            valor_bruto = produto.preco_calculado
                            # Se for um método (callable), executa com ()
                            if callable(valor_bruto):
                                valor_final = valor_bruto()
                            else:
                                valor_final = valor_bruto
                        else:
                            valor_final = produto.preco
                        
                        preco_momento = Decimal(str(valor_final))
                    except Exception:
                        # Fallback de segurança se tudo falhar
                        preco_momento = Decimal(str(produto.preco))
                    # --------------------------------
                    
                    imagem_url = None
                    if hasattr(produto, 'imagem') and produto.imagem:
                        imagem_url = getattr(produto.imagem, 'url', None)

                    PedidoItem.objects.create(
                        pedido=pedido,
                        produto=produto,
                        quantidade=qtd_final,
                        preco=preco_momento,
                        imagem=imagem_url
                    )
                    total_pedido += preco_momento * qtd_final

            # 6. Atualiza o total final do pedido
            pedido.total = round(total_pedido, 2)
            pedido.save()
            
            self.stdout.write(f"   + Pedido #{pedido.id} criado para {cliente.nome} ({cliente.user.email}) - Total: R$ {pedido.total}")