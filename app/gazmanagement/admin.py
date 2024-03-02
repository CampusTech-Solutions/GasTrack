from django.contrib import admin
from .models import *
from leaflet.admin import LeafletGeoAdmin

# Register your models here.

class GasStoreAdmin(LeafletGeoAdmin):
    model = GasStore


admin.site.register(GasStore, GasStoreAdmin)