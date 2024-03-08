from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.conf import settings
from .models import *
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=Client)
def create_client_auth_token(sender, instance=None, created=False, **kwargs):
    
    if created:
        Token.objects.create(user=instance)

@receiver(post_save, sender=GestStore)
def create_gest_auth_token(sender, instance=None, created=False, **kwargs):
    
    if created:
        Token.objects.create(user=instance)