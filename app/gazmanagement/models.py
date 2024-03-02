from django.db import models
from django.contrib.gis.db import models
from accounts.models import GestStore



"""Dépot de Gaz"""

class GasStore(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    manager = models.ForeignKey(GestStore, on_delete=models.CASCADE)
    location = models.PointField(srid=4326, null=False)

    def __str__(self) -> str:
        return f"Gas Store : {self.name}"



"""Marque d'une bouteille"""

class GasBrand(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    compagny = models.CharField(max_length=255, null=False, unique=True)

    def __str__(self) -> str:
        return f"Gas Store : {self.name}"



"""Modèle d'une bouteille à gaz"""

class GasBottle(models.Model):
    image = models.FileField(upload_to="gasmanagement/gasbottles/", default="gasmanagement/gasbottles/default.png")
    weight = models.FloatField(null=False, blank=False)
    price = models.FloatField(null=False, blank=False)



"""Le Stock d'un Dépot de Gaz"""

class Stock(models.Model):
    brand = models.ForeignKey(GasBrand, on_delete=models.CASCADE)
    store = models.ForeignKey(GasStore, on_delete=models.CASCADE)
    bottles = models.ManyToManyField(GasBottle, related_name="gas_bottles_stock")


    def __str__(self) -> str:
        return f"Stock : {self.brand}"



