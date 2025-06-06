# Generated by Django 5.1 on 2025-01-28 02:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loja', '0052_alter_favorito_cliente_alter_favorito_produto'),
    ]

    operations = [
        migrations.CreateModel(
            name='AvaliacaoProduto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nota', models.PositiveIntegerField()),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='avaliacoes', to='loja.cliente')),
                ('produto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='avaliacoes', to='loja.produto')),
            ],
        ),
    ]
