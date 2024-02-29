from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.gis.db import models

# Create your models here.

class Client(AbstractUser):
    no_cni = models.CharField(max_length=255, unique=True,null=True)
    phone_No = models.CharField(max_length=50)
    location = models.PointField(srid=4326, null=True)
    
    def __str__(self) -> str:
        return self.username
    
class Admin(Client):
    def __str__(self) -> str:
        return f"admin: {self.username}"
    
class GestStore(Client):
    matricule = models.CharField(max_length=255, unique=True,null=True)
    
    def __str__(self) -> str:
        return f"Gestionnaire : {self.username}"
    
    
    
    

    
