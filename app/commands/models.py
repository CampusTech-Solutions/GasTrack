from django.db import models
from accounts.models import Client
from  gazmanagement.models import GasStore, GasBottle

# Modèle qour créer les paniers
# Un panier est spécifique à un client pour un dépot particulier
class Basket(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='client_basket')
    gasStore = models.ForeignKey(GasStore, on_delete=models.CASCADE, related_name='basket')


# Modèle pour créer une table commande
class Command(models.Model):
    gasBottle = models.ForeignKey(GasBottle, on_delete=models.CASCADE, related_name="command_gasbottle")
    bottleNumber = models.IntegerField()
    basket = models.ForeignKey(Basket, on_delete=models.CASCADE, related_name="command_basket")

    def __str__(self):
        return f"bottle : {self.gasBottle}, number : {self.bottleNumber}"


# Modèle pour créer la table des commndes à payer... Les commandes payées sont disponibles pour les livraisons
class PayCommand(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE,related_name='client_command')
    command = models.ForeignKey(Command, on_delete=models.CASCADE,related_name='paycommand')
    date = models.DateField()

    def __str__(self) -> str:
        return f"{self.date} : {self.client.first_name} - {self.command.gasbottle}"

