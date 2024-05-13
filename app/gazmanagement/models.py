from django.db import models
from django.contrib.gis.db import models
from accounts.models import GestStore



"""Dépot de Gaz"""

class GasStore(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    manager = models.ForeignKey(GestStore, on_delete=models.CASCADE)
    location = models.PointField(srid=4326, null=True)
    image = models.ImageField(upload_to="gasmanagement/gasstores/", default="gasmanagement/gasstores/default.png")
    store_status = models.BooleanField(default=True)
    infos = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self) -> str:
        return f"Gas Store : {self.name}"



"""Marque d'une bouteille"""

class GasBrand(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    company = models.CharField(max_length=255, null=False)


    def __str__(self) -> str:
        return f"Gas Store : {self.name}"


"""Modèle d'une bouteille à gaz"""

class GasBottle(models.Model):
    brand = models.ForeignKey(GasBrand, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="gasmanagement/gasbottles/", default="gasmanagement/gasbottles/default.png")
    weight = models.FloatField(default=0.0, null=False, blank=False)

    def getBrand(self):
        return self.brand
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
    name = models.CharField(max_length=255, null=False, default="Pas de Nom")
    label = models.CharField(max_length=255, default="Nouveau Stock")

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    def __str__(self) -> str:
        return f"Stock : {self.name} - {self.label}"

    def bottles_tcp(self):
        sgbs = StockGasBottle.objects.filter(stock=self)
        if (len(sgbs) != 0):
            bottles=0; tcp=0;
            for x in sgbs:
                bottles += x.quantity
                tcp += x.total_cp()
        return bottles, tcp

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
    unit_cost_price = models.FloatField(default=0.0, null=False, blank=False)

    def total_cp(self):
        return self.quantity*self.unit_cost_price


class Sales(models.Model):
    date = models.DateField(auto_now_add=True)
    stockgasbottle = models.ForeignKey(StockGasBottle, on_delete=models.CASCADE, null=False)
    quantity = models.IntegerField(default=0)
    unit_selling_price = models.FloatField(default=0.0, null=False, blank=False)

    def cancel(self):
        sgb = StockGasBottle.objects.get(id=self.stockgasbottle.id)
        sgb.quantity += self.quantity
        sgb.save()
        self.delete()

class Entries(models.Model):
    date = models.DateField(auto_now_add=True)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE, null=False)
    bottle = models.ForeignKey(GasBottle, on_delete=models.CASCADE, null=False)
    quantity = models.PositiveIntegerField(default=0)
    unit_cost_price = models.FloatField(default=0.0)

    def cancel(self):
        sgb = StockGasBottle.objects.filter(bottle=self.bottle,stock=self.stock,unit_cost_price=self.unit_cost_price).first()
        if sgb:
            sgb.quantity -= self.quantity
            sgb.save()
        self.delete()



