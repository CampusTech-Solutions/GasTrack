from storedashboard.models import *
from accounts.serializers import GestStoreSerializer
from rest_framework import serializers

class Fact_Sales_Serializer(serializers.ModelSerializer):
    class Meta:
        model = fact_sales
        fields = '__all__'
