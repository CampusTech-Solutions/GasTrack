from django.db import models
from django.contrib.gis.db import models
from accounts.models import GestStore



"""Dépot de Gaz"""

class GasStore(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    manager = models.ForeignKey(GestStore, on_delete=models.CASCADE)
    location = models.PointField(srid=4326, null=True)

    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def getStock(self):
        return Stock.objects.get(store=self)

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
    brand = models.ForeignKey(GasBrand, on_delete=models.CASCADE)
    image = models.FileField(upload_to="gasmanagement/gasbottles/", default="gasmanagement/gasbottles/default.png")
    weight = models.FloatField(default=0.0, null=False, blank=False)
    price = models.FloatField(default=0.0, null=False, blank=False)

    def getBrand(self):
        return self.brand
    def getPrice(self):
        return self.price
    def getWeight(self):
        return self.weight
    
    def setPrice(self, price):
        self.price = price
        self.save()
    def setWeight(self, weight):
        self.weight = weight
        self.save()

    def __str__(self) -> str:
        return f"Gas Bottle : {self.brand.name} - {self.weight}"
    



"""Le Stock d'un Dépot de Gaz"""

class Stock(models.Model):
    store = models.ForeignKey(GasStore, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    def __str__(self) -> str:
        return f"Stock : {self.brand}"

    def add_new_gas(self, bottle, quantity, supplementary_fee=0.0):
        StockGasBottle.objects.create(stock=self, bottle=bottle, quantity=quantity, supplementary_fee=supplementary_fee)

    def get_bottles(self):
        return StockGasBottle.objects.filter(stock=self)

    def update_gas_quntity(self, bottle, quantity):
        stc = StockGasBottle.objects.filter(stock=self, bottle=bottle).first()
        if stc is not None:
            stc.quantity += quantity
            stc.save()
            return True
        return False


class StockGasBottle(models.Model):
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE, null=False)
    bottle = models.ForeignKey(GasBottle, on_delete=models.CASCADE, null=False)
    quantity = models.IntegerField(default=0)
    supplementary_fee = models.FloatField(default=0.0)

