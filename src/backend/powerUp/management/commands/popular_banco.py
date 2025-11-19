from django.core.management.base import BaseCommand
from powerUp.models import Produto, Lote
from django.utils import timezone
from datetime import timedelta

class Command(BaseCommand):
    help = 'Popula o banco de dados com dados iniciais (Produtos e Lotes)'

    def handle(self, *args, **kwargs):
        self.stdout.write("Iniciando população do banco...")

        self.criar_lotes()

        self.stdout.write(self.style.SUCCESS('Banco populado com sucesso!'))

    def criar_lotes(self):
        # Formato: ('Parte do Nome do Produto', Quantidade, Dias para Vencer)
        lotes_data = [
            # --- SUPLEMENTOS (Alta rotatividade, múltiplos lotes) ---
            ('Whey Concentrado', 12, 365),  # Lote 1
            ('Whey Concentrado', 10, 730),  # Lote 2 (mais novo)
            ('Creatina 300g', 15, 730),
            ('Creatina 300g', 10, 400),     # Lote mais antigo
            ('BCAA', 8, 500),
            ('Glutamina', 10, 600),
            ('Cafeína', 20, 730),

            # --- ALIMENTOS (Snacks e Barras - Validade mais curta) ---
            ('Snack Protein - Cebola', 15, 180),
            ('Snack Protein - Queijo', 15, 180),
            ('Snack Protein - Requeijão', 10, 120), # Vence logo
            ('Snack Protein - Requeijão', 10, 180), # Lote novo
            ('Bebida Proteica', 24, 90),            # Vence rápido

            # Barras de Proteína (Vários sabores)
            ('Barra de Proteína - Chocolate', 20, 240),
            ('Barra de Proteína - Chocolate', 15, 365), # Mais um lote de chocolate
            ('Barra de Proteína - Morango', 20, 240),
            ('Barra de Proteína - Frutas Vermelhas', 15, 240),
            ('Barra de Proteína - Pistache', 15, 240),
            ('Barra de Proteína - Tradicional', 25, 240),

            # --- ACESSÓRIOS (Validade longa/infinita simulada) ---
            ('Bolsa Esportiva', 3, 3650),
            ('Bolsa Esportiva', 2, 3650), # Reposição
            ('Strap', 10, 3650),
            ('Garrafa 500ml preta', 8, 3650),
            ('Garrafa 500ml branca', 8, 3650),
            ('Boné preto', 6, 3650),
            ('Boné branco', 6, 3650),

            # --- ROUPAS ---
            ('Casaco branco', 3, 3650),
            ('Bermuda preta', 5, 3650),
            ('Bermuda preta', 5, 3650),   # Mais um lote P ou M (simulado)
            ('Bermuda branca', 5, 3650),
            ('Camiseta Preta', 10, 3650),
            ('Camiseta Branca', 10, 3650),
        ]

        print(f"Processando {len(lotes_data)} entradas de lotes...")

        for nome_prod, qtd, dias_validade in lotes_data:
            try:
                # O icontains busca qualquer produto que contenha esse texto no nome
                # Se houver ambiguidade (ex: 'Camiseta' pode ser preta ou branca),
                # o código pegará o primeiro ou dará erro se usar .get() estrito.
                # Aqui usamos filter().first() para pegar o primeiro correspondente e evitar travar o script.
                
                produtos_encontrados = Produto.objects.filter(nome__icontains=nome_prod)
                
                if produtos_encontrados.exists():
                    # Pega o primeiro que encontrar (útil se vc tiver nomes muito parecidos)
                    produto = produtos_encontrados.first()
                    
                    validade = timezone.now().date() + timedelta(days=dias_validade)
                    
                    Lote.objects.create(
                        produto=produto,
                        quantidade=qtd,
                        validade=validade
                    )
                    self.stdout.write(f"- Lote criado: {qtd}x {produto.nome}")
                else:
                    self.stdout.write(self.style.WARNING(f"Aviso: Produto '{nome_prod}' não encontrado no banco."))

            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Erro ao criar lote para '{nome_prod}': {str(e)}"))