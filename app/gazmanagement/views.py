from rest_framework import viewsets, permissions
from gazmanagement.serializers import *
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

    def create(self, request, *args, **kwargs):

        try:
            gasstore_serializer = self.get_serializer(data=request.data)
            gasstore_serializer.is_valid(raise_exception=True)
            gasstore = gasstore_serializer.save()
        except Exception as error:
            return JsonResponse({"error": str(error)}, status=500)
        
        store_slz = GasStoreSerializer(gasstore)

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

    def create(self, request, *args, **kwargs):
        try:
            stock = Stock.objects.create(store_id= request.data.pop("store"), **request.data)
        except Exception as error:
            return JsonResponse({"error": str(error)}, status=500)

        stock_slz = StockSerializer(stock)

        return JsonResponse({"data" : stock_slz.data}, status=201)


class SalesViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
    serializer_class = SalesSerializer
    queryset = Sales.objects.all()

    def create(self, request, **args):
        bottle = GasBottle.objects.get(id=request.data.pop("bottle"))
        stock = Stock.objects.get(id=request.data.pop("stock"))

        with transaction.atomic():
            try:
                element = Sales.objects.create(bottle= bottle, stock= stock, **request.data)
            except Exception as error:
                return JsonResponse({"error": str(error)}, status=500)

        element_slz = SalesSerializer(element)

        return JsonResponse({"data" : element_slz.data}, status=201)

class EntriesViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
    serializer_class = EntriesSerializer
    queryset = Entries.objects.all()

    def create(self, request, **args):
        bottle = GasBottle.objects.get(id=request.data.pop("bottle"))
        stock = Stock.objects.get(id=request.data.pop("stock"))

        with transaction.atomic():
            try:
                element = Entries.objects.create(bottle= bottle, stock= stock, **request.data)
            except Exception as error:
                return JsonResponse({"error": str(error)}, status=500)
        
        element_slz = EntriesSerializer(element)

        return JsonResponse({"data" : element_slz.data}, status=201)



