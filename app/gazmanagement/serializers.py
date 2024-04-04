from gazmanagement.models import *
from accounts.serializers import GestStoreSerializer
from rest_framework import serializers
from rest_framework_gis.serializers import GeoModelSerializer

class GasStoreSerializer(GeoModelSerializer):
    class Meta:
        model = GasStore
        geo_field = 'location'
        auto_bbox = True
        fields = ["id", "name","manager","location", "image", "store_status"]

        


class GasBrandSerializer(serializers.ModelSerializer):

    class Meta:
        model = GasBrand
        fields = '__all__'


class GasBottleSerializer(serializers.ModelSerializer):
    class Meta:
        model = GasBottle
        fields = ["id", "brand", "image", "weight"]


class StockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock
        fields = '__all__'


class StockGasBottleSerializer(serializers.ModelSerializer):

    class Meta:
        model = StockGasBottle
        fields = '__all__'

class SalesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sales
        fields = '__all__'


class EntriesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Entries
        fields = '__all__'
