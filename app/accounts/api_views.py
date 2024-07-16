from rest_framework import viewsets
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.conf import settings
from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework import filters 
from .models import *
from threading import Thread
from django.template.loader import TemplateDoesNotExist, render_to_string
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives
from .serializers import *
import random
import sys
import string
from django.contrib.gis.geoip2 import GeoIP2
from rest_framework_gis.filters import DistanceToPointFilter


class IsSuperUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser
    
    
class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        
        if request.user:
            if request.user.is_superuser:
                return True
            else:
                return obj.user == request.user
        else:
            return False


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    
    ips = ['127.0.0.1','172.20.10.2','172.18.0.5','0.0.0.0','172.20.0.5','172.20.0.1']

    if ip in ips: # Only define the IP if you are testing on localhost.
        ip = '8.8.8.8'
    return ip

def get_class(class_name):
    return getattr(sys.modules[__name__], class_name)

def is_gestStore(user):
    
    try:
        gest = GestStore.objects.get(username=user.username,email=user.email)
    
    except GestStore.DoesNotExist:
            return False
    
    return True
    
def getClassName(class_object):
    return class_object.__name__



class BaseClientViewSet(viewsets.ModelViewSet):
    
    model =  Client
    queryset = model.objects.all()
    serializer_class =  get_class(model.__name__+'Serializer')
    distance_filter_field = 'geometry'
    filter_backends = [DistanceToPointFilter,]
    bbox_filter_include_overlapping = True
    
    
    def get_permissions(self):
        
        if self.request.method == "POST":
            self.permission_classes = [permissions.AllowAny]

        elif (
            self.action == "retrieve"
            or self.action == "update"
            or self.action == "destroy"
        ):
            self.permission_classes = [IsAuthenticated,]

        elif self.action == "list":
            self.permission_classes = [
                IsSuperUser,
            ]

        else:
            self.permission_classes = [IsAuthenticated]

        return super().get_permissions()

    @action(detail=False)
    def logout(self, request):
        
        logout(request)
        response = {
            "status": status.HTTP_200_OK,
            "message": "success",
        }
        return Response(response, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def deleteAll(self, request):
        
        if request.user.is_superuser:
            users = self.model.objects.all().exclude(id=request.user.id)
            
            users.delete()
        
        return Response(status=status.HTTP_200_OK)

class ClientViewSet(BaseClientViewSet):
    model =  Client
    queryset = model.objects.all()
    serializer_class =  get_class(model.__name__+'Serializer')
    

class AdminViewSet(BaseClientViewSet):
    model =  Admin
    queryset = model.objects.all()
    serializer_class =  get_class(model.__name__+'Serializer')

class GestStoreViewSet(BaseClientViewSet):
    model =  GestStore
    queryset = model.objects.all()
    serializer_class =  get_class(model.__name__+'Serializer')
    
    
class LoginViewSet(viewsets.ModelViewSet):
    model = Client
    queryset = Client.objects.all()
    serializer_class = LoginSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    
    def create(self, request):
        serializers = self.serializer_class(data=request.data)
        
        if serializers.is_valid():
            username = serializers.validated_data["username"]
            password = serializers.validated_data["password"]
            
            user = authenticate(request, username=username, password=password)
            
            if user is None:
                user = self.model.objects.get(username=username, password=password)
                
            if user is not None:
                token = Token.objects.get(user=user)
                login(request=request, user=user)
                
                response = {
                    "status": status.HTTP_200_OK,
                    "message": "Successfully authenticated",
                    "data": {
                        "token": token.key,
                        "userId": user.pk,
                        "email": user.email,
                        "username": user.username,
                        "admin": user.is_superuser,
                        "geststore": is_gestStore(user),
                    },
                }
                
            
                return Response(response, status=status.HTTP_200_OK)
            else:
                response = {
                    "status": status.HTTP_401_UNAUTHORIZED,
                    "message": "Accès refusé"
                }
                return Response(response, status=status.HTTP_401_UNAUTHORIZED)
            
        response = {
            "status": status.HTTP_400_BAD_REQUEST,
            "message": "Erreur",
            "data": serializers.errors
        }
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, request):
        return Response({}, status=status.HTTP_200_OK)

class PasswordResetViewSet(viewsets.ModelViewSet): 
    model = Client
    queryset = Client.objects.all()
    serializer_class = PasswordResetSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    
    def create(self, request):
        
        logout(request)
        serializers = self.serializer_class(data=request.data)
        print(serializers)
        
        if serializers.is_valid(): 
           serializers.save()
           return Response({"code" : serializers.code}, status=status.HTTP_200_OK)
        
    
    def list(self, request):
        return Response({}, status=status.HTTP_200_OK)


class ResetViewSet(viewsets.ModelViewSet): 
    model = Client
    queryset = Client.objects.all()
    serializer_class = ResetSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    
    def create(self, request):
        
        serializers = self.serializer_class(data=request.data)
        
        if serializers.is_valid(): 
            code =  serializers.validated_data["code"]
            
            try:
               user= Client.objects.get(code=code)
               print(f"username = {user.username}")
               
            except Client.DoesNotExist:
                response = {
                           "status": status.HTTP_404_NOT_FOUND,
                           "message": "User does not exist",
                           "data": "verify your code at your email address"
                           }
                
                return Response(response,status=status.HTTP_404_NOT_FOUND)
            
            password = serializers.validated_data["password"]
            user.password = password
            user.save()
            
            print(request.data)
            print(request.user)
            response = {
                           "status": status.HTTP_200_OK,
                           "message": "Password reset successfully",
                           "data": "password reset successful"
                           }
                
            return Response(response,status=status.HTTP_200_OK)
        
        
    def list(self, request):
        return Response({}, status=status.HTTP_200_OK)
    
    

class AdminLoginViewSet(LoginViewSet):
    model = Admin
    queryset = Admin.objects.all()
    serializer_class = AdminLoginSerializer

class GestStoreLoginViewSet(LoginViewSet):
    model = GestStore
    queryset = GestStore.objects.all()
    serializer_class = GestStoreLoginSerializer
    

class SignUpViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = SignUpSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    
    def create(self, request):
        
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()

            g = GeoIP2()
            ip = get_client_ip(request)

            location = g.geos(ip)

            user.location = location
            user.save()

            token = Token.objects.get(user=user)
            response = {
                "status" : status.HTTP_200_OK,
                "data": {
                    "Token": token.key,
                    "userId": user.pk,
                    "username": user.username,
                    "email": user.email,
                    "admin": user.is_superuser
                },
            }
            
            """template = TemplateEmail(
                app_name="accounts",
                to=serializer.validated_data["email"],
                from_email=settings.EMAIL_HOST_USER,
                subject=f"account created successfully",
                template="signup",
                context={"user": user},
            )
            
            
            template.start()
            template.join() """
            
            return Response(response, status=status.HTTP_200_OK)
        
        response = {
            "status" : status.HTTP_400_BAD_REQUEST,
            "data": serializer.errors
        }
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, request):
        return Response({}, status=status.HTTP_200_OK)


class AdminSignUpViewSet(SignUpViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSignUpSerializer
    
class GestStoreSignUpViewSet(SignUpViewSet):
    queryset = GestStore.objects.all()
    serializer_class = GestStoreSignUpSerializer
    


