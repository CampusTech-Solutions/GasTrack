from rest_framework import serializers
from .models import *
from accounts.serializers import ClientSerializer

class CommandSerializer(serializers.ModelSerializer):
    gasbottle = serializers.IntegerField()

    class Meta:
        model = Command
        fields = ["gasbottle"]


class PayCommandSerializer(serializers.ModelSerializer):
    date = serializers.DateField()

    class Meta:
        model = PayCommand
        fields = ["client", "command", "date"]