from .models import *
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_gis.serializers import GeoModelSerializer

class ClientSerializer(GeoModelSerializer):
    
    password = serializers.CharField(required=False,source="user.password")
    class Meta:
        
        model = Client
        geo_field = 'location'
    
        auto_bbox = True
        fields = ["id","username","email","no_cni","phone_No", "password","location"]

        

    def create(self, validated_data, *args, **kwargs):
        
        user = Client.objects.create_user(username=validated_data["username"],
                                        email=validated_data["email"],
                                        no_cni=validated_data["no_cni"],
                                        phone=validated_data["phone_No"],
                                        )
        
        return user
    

class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    
    class Meta:
        model = Client
        fields = ["username", "password"]
    
    def create_user(self, validated_data, *args, **kwargs):
        
        user = authenticate(
             request,
             username=validated_data["username"],
             password=validated_data["password"],
        )

class SignUpSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    
    class Meta:
        model = Client
        fields = ["username","email","no_cni","phone_No", "password"]
        
    def create(self, validated_data):
        return Client.objects.create_user(**validated_data)

    
    