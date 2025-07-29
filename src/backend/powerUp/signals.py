from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import Cliente

@receiver(post_delete, sender=Cliente)
def delete_user_with_cliente(sender, instance, **kwargs):
    if instance.user:
        instance.user.delete()
