from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.utils import timezone
from django.conf import settings
from .models import *


@receiver(post_save, sender=GasStore)
def create_stock(sender, instance=None, created=False, **kwargs):
    
    if created:
        Stock.objects.create(store=instance)
    