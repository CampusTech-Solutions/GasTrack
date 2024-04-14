from django.contrib import admin
from .models import *
from leaflet.admin import LeafletGeoAdmin



class GasStoreAdmin(LeafletGeoAdmin):
    model = GasStore

class GasBrandAdmin(LeafletGeoAdmin):
    model = GasBrand

class GasBottleAdmin(LeafletGeoAdmin):
    model = GasBottle

class StockAdmin(LeafletGeoAdmin):
    model = Stock

class StockGasBottleAdmin(LeafletGeoAdmin):
    model = StockGasBottle

class StockAdmin(LeafletGeoAdmin):
    model = Stock


admin.site.register(GasStore, GasStoreAdmin)
admin.site.register(GasBrand, GasBrandAdmin)
admin.site.register(GasBottle, GasBottleAdmin)
admin.site.register(StockGasBottle, StockGasBottleAdmin)
admin.site.register(Stock, StockAdmin)