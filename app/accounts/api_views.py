from rest_framework import viewsets
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
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
    
    ips = ['127.0.0.1','172.20.10.2']
    if ip in ips: # Only define the IP if you are testing on localhost.
        ip = '8.8.8.8'
    return ip

class ClientViewSet(viewsets.ModelViewSet):
    
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    distance_filter_field = 'geometry'
    filter_backends = (DistanceToPointFilter,)
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

        return super(ClientViewSet, self).get_permissions()

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
            users = Client.objects.all().exclude(id=request.user.id)
            
            users.delete()
       
        
        return Response(status=status.HTTP_200_OK)

class LoginViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = LoginSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    
    def create(self, request):
        serializers = LoginSerializer(data=request.data)
        
        if serializers.is_valid():
            username = serializers.validated_data["username"]
            password = serializers.validated_data["password"]
            
            user = authenticate(request, username=username, password=password)
            
            if user is None:
                user = Client.objects.get(username=username, password=password)
                
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
                        "admin": user.is_superuser
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

class SignUpViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = SignUpSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    
    def create(self, request):
        serializer = SignUpSerializer(data=request.data)
        
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
                },
            }
            
            template = TemplateEmail(
                app_name="accounts",
                to=serializer.validated_data["email"],
                from_email=settings.EMAIL_HOST_USER,
                subject=f"account created successfully",
                template="signup",
                context={"user": user},
            )
            
            
            template.start()
            template.join()
            
            return Response(response, status=status.HTTP_200_OK)
        
        response = {
            "status" : status.HTTP_400_BAD_REQUEST,
            "data": serializer.errors
        }
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, request):
        return Response({}, status=status.HTTP_200_OK)




