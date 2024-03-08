from django.db import models
from accounts.models import Client

# Modèle pour créer une table commande
class Command(models.Model):
    gasbottle = models.IntegerField()

    def __str__(self):
        return f"bottle number : {self.gasbottle}"
    


# Modèle pour créer la table des commndes à payer
class PayCommand(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE,related_name='paycommands')
    command = models.ForeignKey(Command, on_delete=models.CASCADE,related_name='paycommands')
    date = models.DateField()

    def __str__(self) -> str:
        return f"{self.date} : {self.client.first_name} - {self.command.gasbottle}"
