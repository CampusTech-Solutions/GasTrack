from django.db.models.signals import *
from django.dispatch import receiver
from django.utils import timezone
from django.conf import settings
from .models import *


@receiver(post_save, sender=GasStore)
def create_stock(sender, instance=None, **kwargs):
    Stock.objects.create(store=instance)

@receiver(pre_delete, sender=GasStore)
def delete_stock(sender, instance=None, **kwargs):
    Stock.objects.filter(store=instance).delete()


