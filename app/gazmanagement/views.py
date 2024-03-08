from rest_framework import viewsets, permissions
from .serializers import *
from django.http import JsonResponse
from django.db import transaction


class GasBrandViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
    serializer_class = GasBrandSerializer
    queryset = GasBrand.objects.all()


class GasStoreViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
    serializer_class = GasStoreSerializer
    queryset = GasStore.objects.all()


class GasBottleViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
    serializer_class = GasBottleSerializer
    queryset = GasBottle.objects.all()


class StockViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
    serializer_class = StockSerializer
    queryset = Stock.objects.all()


class StockGasBottleViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
    serializer_class = StockGasBottleSerializer
    queryset = StockGasBottle.objects.all()
