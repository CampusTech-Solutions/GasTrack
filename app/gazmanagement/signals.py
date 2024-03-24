from django.db.models.signals import *
from django.dispatch import receiver
from django.utils import timezone
from django.conf import settings
from .models import *



@receiver(pre_save, sender=StockGasBottle)
def update_stock(sender, instance=None, **kwargs):
    try:
        previous_stock = StockGasBottle.objects.get(id=instance.id)
        new_qty = instance.quantity - previous_stock.quantity
    except:
        new_qty = instance.quantity

    stock = instance.stock
    stock.total_bottles += new_qty
    stock.value += (instance.bottle.price+instance.supplementary_fee)*new_qty
    stock.updated_at = timezone.now()
    stock.save()


@receiver(pre_delete, sender=GasStore)
def delete_stock(sender, instance=None, **kwargs):
    Stock.objects.filter(store=instance).delete()


