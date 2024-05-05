from rest_framework import serializers
from .models import *
from accounts.serializers import ClientSerializer

class CartSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Cart
        fields = ["client", "gasStore"]


class CommandSerializer(serializers.ModelSerializer):
    bottleNumber = serializers.IntegerField()

    class Meta:
        model = Command
        fields = ["gasBottle", "cart", "bottleNumber"]


class PayCommandSerializer(serializers.ModelSerializer):
    date = serializers.DateField()

    class Meta:
        model = PayCommand
        fields = ["client", "command", "date"]