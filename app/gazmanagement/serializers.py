from gazmanagement.models import *
from accounts.serializers import GestStoreSerializer
from rest_framework import serializers
from rest_framework_gis.serializers import GeoModelSerializer

class GasStoreSerializer(GeoModelSerializer):
    class Meta:
        model = GasStore
        geo_field = 'location'
        auto_bbox = True
        fields = ["id", "name","manager","location", "image", "store_status", "created_at", "infos"]

        


class GasBrandSerializer(serializers.ModelSerializer):

    class Meta:
        model = GasBrand
        fields = '__all__'


class GasBottleSerializer(serializers.ModelSerializer):
    brand = GasBrandSerializer(read_only=True)

    class Meta:
        model = GasBottle
        fields = ["id", "brand", "image", "weight"]
    
    def to_internal_value(self, data):
        return data

    def create(self, validated_data):
        brand_id = validated_data.pop('brand_id')
        gasbottle = GasBottle.objects.create(brand_id=brand_id, **validated_data)
        return gasbottle


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'


class StockGasBottleSerializer(serializers.ModelSerializer):
    stock = StockSerializer(read_only=True)
    bottle = GasBottleSerializer(read_only=True)

    class Meta:
        model = StockGasBottle
        fields = '__all__'

    def to_internal_value(self, data):
        return data

    def create(self, validated_data):
        sgb = StockGasBottle.objects.create(**validated_data)
        return sgb

class SalesSerializer(serializers.ModelSerializer):
    stockgasbottle = StockGasBottleSerializer(read_only=True)
    quantity = serializers.IntegerField()
    unit_selling_price = serializers.FloatField()

    class Meta:
        model = Sales
        fields = '__all__'
    
    def validate_quantity(self, value):
        if value < 0:
            raise serializers.ValidationError("Integer number must be positive.")
        return value

    def validate_unit_selling_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Float number must be positive.")
        return value
    
    def to_internal_value(self, data):
        return data

    def create(self, validated_data):
        sales = Sales.objects.create(**validated_data)
        return sales


class EntriesSerializer(serializers.ModelSerializer):
    stock = StockSerializer(read_only=True)
    bottle = GasBottleSerializer(read_only=True)
    quantity = serializers.IntegerField()
    unit_cost_price = serializers.FloatField()

    class Meta:
        model = Entries
        fields = '__all__'

    def validate_quantity(self, value):
        if value < 0:
            raise serializers.ValidationError("Integer number must be positive.")
        return value

    def validate_unit_cost_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Float number must be positive.")
        return value
    

    def to_internal_value(self, data):
        return data

    def create(self, validated_data):
        entry = Entries.objects.create(**validated_data)
        return entry
