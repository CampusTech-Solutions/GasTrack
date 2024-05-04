from django.db.models.signals import *
from django.dispatch import receiver
from django.utils import timezone
from django.conf import settings
from .models import *


# @receiver(pre_delete, sender=GasStore)
# def delete_stock(sender, instance=None, **kwargs):
#     Stock.objects.filter(store=instance).delete()


@receiver(post_save, sender=StockGasBottle)
def update_stock_gas_bottle(sender, instance=None, **kwargs):
    if instance.quantity == 0:
        instance.delete()


@receiver(post_save, sender=Sales)
def update_stock_gas_bottle(sender, instance=None, **kwargs):
    sgb = StockGasBottle.objects.get(id=instance.stockgasbottle.id)
    sgb.quantity -= int(instance.quantity)
    sgb.save()


@receiver(post_save, sender=Entries)
def create_update_stock_gas_bottle(sender, instance=None, **kwargs):
    sgb = StockGasBottle.objects.filter(
            stock=instance.stock, 
            bottle=instance.bottle, 
            unit_cost_price=instance.unit_cost_price
        ).first()

    if sgb:
        sgb.quantity += int(instance.quantity)
        sgb.save()
    else:
        StockGasBottle.objects.create(
            stock=instance.stock,
            bottle=instance.bottle,
            quantity=instance.quantity,
            unit_cost_price=instance.unit_cost_price
        )



