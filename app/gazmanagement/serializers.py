from .models import *
from rest_framework import serializers
from rest_framework_gis.serializers import GeoModelSerializer

class GasStoreSerializer(GeoModelSerializer):

    class Meta:
        model = GasStore
        geo_field = 'location'
        auto_bbox = True
        fields = ["name","manager","location"]

    
class GasBrandSerializer(serializers.ModelSerializer):

    class Meta:
        model = GasBrand
        fields = '__all__'

class GasBottleSerializer(serializers.ModelSerializer):
    brand = GasBrandSerializer()
    class Meta:
        model = GasBottle
        fields = ["brand", "image", "weight", "price"]
    


class StockSerializer(serializers.ModelSerializer):
    store = GasStoreSerializer()

    class Meta:
        model = Stock
        fields = ["store"]
    

class StockGasBottleSerializer(serializers.ModelSerializer):
    stock = StockSerializer()
    bottle = GasBottleSerializer()
    supplementary_fee = serializers.IntegerField(required=False)

    class Meta:
        model = StockGasBottle
        fields = '__all__'
    

    
    