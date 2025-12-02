import random
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.db import transaction
from powerUp.models import Cliente, Pedido, AvaliacaoProduto

class Command(BaseCommand):
    help = 'Gera Avaliações para Pedidos já finalizados existentes no banco'

    def handle(self, *args, **kwargs):
        self.stdout.write("--- INICIANDO GERAÇÃO DE AVALIAÇÕES ---")
        
        # Verifica se existem pedidos finalizados para avaliar
        if not Pedido.objects.filter(status='4').exists():
            self.stdout.write(self.style.ERROR("ERRO: Não existem pedidos com status 'Finalizado' (4) no banco para serem avaliados."))
            return

        with transaction.atomic():
            self.criar_avaliacoes()

        self.stdout.write(self.style.SUCCESS('--- AVALIAÇÕES GERADAS COM SUCESSO! ---'))

    def criar_avaliacoes(self):
        self.stdout.write("Gerando avaliações para produtos comprados...")
        
        # Filtra apenas pedidos FINALIZADOS (Status '4')
        # Pedidos em processamento ou envio não devem ter avaliação ainda
        pedidos_validos = Pedido.objects.filter(status='4')
        
        count_avaliacoes = 0

        for pedido in pedidos_validos:
            try:
                # Tenta pegar o cliente dono do pedido
                cliente = Cliente.objects.get(user=pedido.user)
            except Cliente.DoesNotExist:
                continue

            # Itera sobre os itens do pedido
            for item in pedido.itens.all():
                produto = item.produto
                
                # Regra: 70% de chance de o cliente avaliar o produto se o pedido foi finalizado
                if random.random() < 0.7:
                    
                    # Verifica se já avaliou esse produto antes (Unique Together)
                    if not AvaliacaoProduto.objects.filter(cliente=cliente, produto=produto).exists():
                        
                        # Decide a nota (Pesos: mais chances de 5 e 4 estrelas)
                        nota = random.choices([5, 4, 3, 2, 1], weights=[50, 30, 10, 5, 5])[0]
                        
                        # Define uma data de avaliação aleatória (entre 5 e 15 dias após a compra)
                        dias_depois = random.randint(5, 15)
                        data_avaliacao = pedido.dt_hora + timedelta(days=dias_depois)

                        try:
                            # Cria a avaliação (Apenas Nota, conforme seu modelo atual)
                            avaliacao = AvaliacaoProduto.objects.create(
                                cliente=cliente,
                                produto=produto,
                                nota=nota
                            )
                            
                            # Hack para atualizar a data de criação (auto_now_add) para o passado
                            AvaliacaoProduto.objects.filter(id=avaliacao.id).update(data_avaliacao=data_avaliacao)

                            count_avaliacoes += 1
                            self.stdout.write(f"   * Avaliação criada: {nota} estrela(s) para '{produto.nome}' por {cliente.nome}")
                        
                        except Exception as e:
                            # Ignora silenciosamente erros de duplicidade ou validação para não parar o script
                            pass

        if count_avaliacoes == 0:
            self.stdout.write(self.style.WARNING("Nenhuma nova avaliação foi criada (talvez os pedidos existentes já tenham sido avaliados)."))
        else:
            self.stdout.write(f"-> Total de {count_avaliacoes} novas avaliações geradas.")