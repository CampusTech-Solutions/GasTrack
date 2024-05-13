from gazmanagement.models import *

class dim_day_sales(models.Model):
    class Meta:
        app_label = 'storedashboard'
    day = models.IntegerField(null=False)
class dim_day_purchases(models.Model):
    class Meta:
        app_label = 'storedashboard'
    day = models.IntegerField(null=False)

class dim_month_sales(models.Model):
    class Meta:
        app_label = 'storedashboard'
    day = models.ForeignKey(dim_day_sales, on_delete=models.CASCADE)
    month = models.IntegerField(null=False)
class dim_month_purchases(models.Model):
    class Meta:
        app_label = 'storedashboard'
    day = models.ForeignKey(dim_day_purchases, on_delete=models.CASCADE)
    month = models.IntegerField(null=False)

class dim_year_sales(models.Model):
    class Meta:
        app_label = 'storedashboard'
    month = models.ForeignKey(dim_month_sales, on_delete=models.CASCADE)
    year = models.IntegerField(null=False)
class dim_year_purchases(models.Model):
    class Meta:
        app_label = 'storedashboard'
    month = models.ForeignKey(dim_month_purchases, on_delete=models.CASCADE)
    year = models.IntegerField(null=False)

class dim_date_sales(models.Model):
    class Meta:
        app_label = 'storedashboard'
    date = models.DateField(auto_now_add=False, null=False)
    year = models.ForeignKey(dim_year_sales, on_delete=models.CASCADE)
class dim_date_purchases(models.Model):
    class Meta:
        app_label = 'storedashboard'
    date = models.DateField(auto_now_add=False, null=False)
    year = models.ForeignKey(dim_year_purchases, on_delete=models.CASCADE)

class dim_gasbrand_sales(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    company = models.CharField(max_length=255, null=False)
class dim_gasbrand_purchases(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    company = models.CharField(max_length=255, null=False)
class dim_gasbrand_currentstate(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    company = models.CharField(max_length=255, null=False)

class dim_gasbottle_sales(models.Model):
    class Meta:
        app_label = 'storedashboard'
    brand = models.ForeignKey(dim_gasbrand_sales, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="gasmanagement/gasbottles/", default="gasmanagement/gasbottles/default.png")
    weight = models.FloatField(default=0.0, null=False, blank=False)
class dim_gasbottle_purchases(models.Model):
    class Meta:
        app_label = 'storedashboard'
    brand = models.ForeignKey(dim_gasbrand_purchases, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="gasmanagement/gasbottles/", default="gasmanagement/gasbottles/default.png")
    weight = models.FloatField(default=0.0, null=False, blank=False)
class dim_gasbottle_currentstate(models.Model):
    class Meta:
        app_label = 'storedashboard'
    brand = models.ForeignKey(dim_gasbrand_currentstate, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="gasmanagement/gasbottles/", default="gasmanagement/gasbottles/default.png")
    weight = models.FloatField(default=0.0, null=False, blank=False)

 
class dim_stock_sales(models.Model):
    class Meta:
        app_label = 'storedashboard'
    name = models.CharField(max_length=255, null=False, unique=True)
    description = models.TextField()
class dim_stock_purchases(models.Model):
    class Meta:
        app_label = 'storedashboard'
    name = models.CharField(max_length=255, null=False, unique=True)
    description = models.TextField()
class dim_stock_currentstate(models.Model):
    class Meta:
        app_label = 'storedashboard'
    name = models.CharField(max_length=255, null=False, unique=True)
    description = models.TextField()




class fact_currentstate(models.Model):
    class Meta:
        app_label = 'storedashboard'
    gasbottle = models.ForeignKey(dim_gasbottle_currentstate, on_delete=models.CASCADE)
    stock = models.ForeignKey(dim_stock_currentstate, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    selling_price = models.FloatField(default=0.0)



class fact_sales(models.Model):
    class Meta:
        app_label = 'storedashboard'
    date = models.ForeignKey(dim_date_sales,on_delete=models.CASCADE)
    gasbottle = models.ForeignKey(dim_gasbottle_sales, on_delete=models.CASCADE)
    stock = models.ForeignKey(dim_stock_sales, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    unit_price = models.FloatField(default=0.0)
    total_price = models.FloatField(default=0.0)



class fact_purchases(models.Model):
    class Meta:
        app_label = 'storedashboard'
    date = models.ForeignKey(dim_date_purchases,on_delete=models.CASCADE)
    gasbottle = models.ForeignKey(dim_gasbottle_purchases, on_delete=models.CASCADE)
    stock = models.ForeignKey(dim_stock_purchases, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    unit_price = models.FloatField(default=0.0)
    total_price = models.FloatField(default=0.0)
