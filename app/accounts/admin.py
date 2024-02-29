from django.contrib import admin
from .models import *
from leaflet.admin import LeafletGeoAdmin

# Register your models here.

class ClientAdmin(LeafletGeoAdmin):
    model = Client
    
class GAdmin(LeafletGeoAdmin):
    model = Admin

class GestStoreAdmin(LeafletGeoAdmin):
    model = GestStore
    

admin.site.register(Client, ClientAdmin)    
admin.site.register(GestStore, GestStoreAdmin)
admin.site.register(Admin, GAdmin)
