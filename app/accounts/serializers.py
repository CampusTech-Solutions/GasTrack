from .models import *
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_gis.serializers import GeoModelSerializer
import string
import random


def generate_code(digit):
    
    characters = string.ascii_letters + string.digits
    
    code = ''.join(random.choice(characters) for i in range(digit))
    
    return code


class ClientSerializer(GeoModelSerializer):
    
    password = serializers.CharField(required=False,source="client.password")
    class Meta:
        
        model = Client
        geo_field = 'location'
    
        auto_bbox = True
        fields = ["id","username","email","no_cni","phone_No", "password","location","code"]
        
        extra_kwargs = {"code": {
            "required": False,
        }}
    def create(self, validated_data, *args, **kwargs):
        
        user = self.Meta.model.objects.create_user(**validated_data)
        
        return user
    
class AdminSerializer(ClientSerializer):
    
    class Meta(ClientSerializer.Meta):

        model = Admin
        

class GestStoreSerializer(ClientSerializer):
    
    class Meta(ClientSerializer.Meta):
        
        model = GestStore
        fields = ClientSerializer.Meta.fields.copy()
        fields.append('matricule')
        
    
    

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
        
class AdminLoginSerializer(LoginSerializer):
    
    class Meta(LoginSerializer.Meta):
        model = Admin

class GestStoreLoginSerializer(LoginSerializer):
    
    class Meta(LoginSerializer.Meta):
        model = GestStore

class SignUpSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    
    class Meta:
        model = Client
        fields = ["username","email","no_cni","phone_No", "password"]
        
    def create(self, validated_data):
        return self.Meta.model.objects.create_user(**validated_data)

    
class AdminSignUpSerializer(SignUpSerializer):
    
    class Meta(SignUpSerializer.Meta):
        model = Admin
        
class GestStoreSignUpSerializer(SignUpSerializer):
    
    class Meta(SignUpSerializer.Meta):
        model = GestStore
        fields = ["username","email","no_cni","phone_No", "password","matricule"]
        
        
class PasswordResetSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    class Meta:
        model = Client
        fields = ["username","email"]
        
        
    def create(self, validated_data):
        
        code = generate_code(4)+"-"+generate_code(4)
        print(validated_data)
        print(f"code = {code}")
        user = self.Meta.model.objects.get(**validated_data)
       
        
        user.code = code
        
        user.save()
        
        return user

class ResetSerializer(serializers.Serializer):
    code = serializers.CharField()
    password = serializers.CharField()
    
    class Meta:
        model = Client
        fields = ["code","password"]
        
        
    def create(self, validated_data):
        user = self.context["request"].user
       
        return user
    

