from gazmanagement.models import *

class dim_day(models.Model):
    class Meta:
        app_label = 'storedashboard'
    day = models.IntegerField(null=False)

class dim_month(models.Model):
    class Meta:
        app_label = 'storedashboard'
    day = models.ForeignKey(dim_day, on_delete=models.CASCADE)
    month = models.IntegerField(null=False)


class dim_year(models.Model):
    class Meta:
        app_label = 'storedashboard'
    month = models.ForeignKey(dim_month, on_delete=models.CASCADE)
    year = models.IntegerField(null=False)


class dim_date(models.Model):
    class Meta:
        app_label = 'storedashboard'
    date = models.DateField(auto_now_add=False, null=False)
    year = models.ForeignKey(dim_year, on_delete=models.CASCADE)


class dim_gasbrand(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    company = models.CharField(max_length=255, null=False)


class dim_gasbottle(models.Model):
    class Meta:
        app_label = 'storedashboard'
    brand = models.ForeignKey(dim_gasbrand, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="gasmanagement/gasbottles/", default="gasmanagement/gasbottles/default.png")
    weight = models.FloatField(default=0.0, null=False, blank=False)


class dim_stock(models.Model):
    class Meta:
        app_label = 'storedashboard'
    name = models.CharField(max_length=255, null=False, unique=True)
    description = models.TextField()


class dim_stockgasbottle(models.Model):
    class Meta:
        app_label = 'storedashboard'
    gasbottle = models.ForeignKey(dim_gasbottle, on_delete=models.CASCADE)
    stock = models.ForeignKey(dim_stock, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    selling_price = models.FloatField(default=0.0)


class fact_sales(models.Model):
    class Meta:
        app_label = 'storedashboard'
    date = models.ForeignKey(dim_date,on_delete=models.CASCADE)
    stockgasbottle = models.ForeignKey(dim_stockgasbottle, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    cost_price = models.FloatField(default=0.0)
