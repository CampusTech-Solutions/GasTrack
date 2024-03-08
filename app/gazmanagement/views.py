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
    queryset = GasStore.objects.all()#

    def create(self, request, *args, **kwargs):

        manager = GestStore.objects.get(id=request.data.pop("manager"))
    
        try:
            with transaction.atomic():
                store = GasStore.objects.create(manager= manager, **request.data)
        except Exception as error:
            return JsonResponse({"error": str(error)}, status=500)
        
        store_slz = GasStoreSerializer(store)

        return JsonResponse({"data" : store_slz.data}, status=201)


class GasBottleViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
    serializer_class = GasBottleSerializer
    queryset = GasBottle.objects.all()

    def create(self, request, *args, **kwargs):

        brand = GasBrand.objects.get(id=request.data.pop("brand"))
    
        try:
            gasbottle = GasBottle.objects.create(brand= brand, **request.data)
        except Exception as error:
            return JsonResponse({"error": str(error)}, status=500)
        
        gasbottle_slz = GasBottleSerializer(gasbottle)

        return JsonResponse({"data" : gasbottle_slz.data}, status=201)


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

    def create(self, request, **args):
        bottle = GasBottle.objects.get(id=request.data.pop("bottle"))
        store = GasStore.objects.get(id=request.data.pop("store"))
        stock = store.getStock()

        try:
            element = StockGasBottle.objects.create(bottle= bottle, stock= stock, **request.data)
        except Exception as error:
            return JsonResponse({"error": str(error)}, status=500)
        
        element_slz = StockGasBottleSerializer(element)

        return JsonResponse({"data" : element_slz.data}, status=201)



