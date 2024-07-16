from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.decorators import action
from django.conf import settings
from rest_framework.permissions import IsAuthenticated


class CartViewSet(viewsets.ModelViewSet):

    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]


class CommandViewSet(viewsets.ModelViewSet):

    queryset = Command.objects.all()
    serializer_class = CommandSerializer
    permission_classes = [IsAuthenticated]


class PayCommandViewSet(viewsets.ModelViewSet):

    queryset = PayCommand.objects.all()
    serializer_class = PayCommandSerializer
    permission_classes = [IsAuthenticated]