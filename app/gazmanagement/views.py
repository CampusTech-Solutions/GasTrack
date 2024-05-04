from rest_framework import viewsets, permissions
from gazmanagement.serializers import *
from django.http import JsonResponse
from django.db import transaction
from django.shortcuts import redirect


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
    
    def retrievestore(self, request):
        gs = GasStore.objects.filter(manager_id=request.user.id).first()
        store_slz = GasStoreSerializer(gs)
        return JsonResponse({"data" : store_slz.data}, status=200)


class GasBottleViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
    serializer_class = GasBottleSerializer
    queryset = GasBottle.objects.all()

    def create(self, request, *args, **kwargs):

        try:
            gasbottle_serializer = self.get_serializer(data=request.data)
            gasbottle_serializer.is_valid(raise_exception=True)
            gasbottle = gasbottle_serializer.save()
        except Exception as error:
            return JsonResponse({"error": str(error)}, status=500)
        
        bottle_slz = GasBottleSerializer(gasbottle)

        return JsonResponse({"data" : bottle_slz.data}, status=201)

class StockGasBottleViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
    serializer_class = StockGasBottleSerializer
    queryset = StockGasBottle.objects.all()

    def list(self, request, id=None, *args, **kwargs):
        if id:
            storestocks = Stock.objects.filter(store_id=id).values_list('id', flat=True)
            sgbs = StockGasBottle.objects.filter(stock_id__in=storestocks)
            sgb_slz = StockGasBottleSerializer(sgbs, many=True)
            return JsonResponse({"results" : sgb_slz.data}, status=200)
        else:
            return super().list(request, *args, **kwargs)

    # def create(self, request, *args, **kwargs):

    #     try:
    #         gasbottle_serializer = self.get_serializer(data=request.data)
    #         gasbottle_serializer.is_valid(raise_exception=True)
    #         gasbottle = gasbottle_serializer.save()
    #     except Exception as error:
    #         return JsonResponse({"error": str(error)}, status=500)
        
    #     bottle_slz = GasBottleSerializer(gasbottle)

    #     return JsonResponse({"data" : bottle_slz.data}, status=201)


class StockViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
    serializer_class = StockSerializer
    queryset = Stock.objects.all()

    def create(self, request, *args, **kwargs):
        try:
            stock_serializer = self.get_serializer(data=request.data)
            stock_serializer.is_valid(raise_exception=True)
            stock = stock_serializer.save()
        except Exception as error:
            return JsonResponse({"error": str(error)}, status=500)
        
        stock_slz = StockSerializer(stock)

        return JsonResponse({"data" : stock_slz.data}, status=201)

    def retrieve(self, request, id=None):
        stocks = Stock.objects.filter(store_id=id)

        if stocks:
            stocks_slz = StockSerializer(stocks, many=True)
            return JsonResponse({"data" : stocks_slz.data}, status=200)
        else:
            return JsonResponse({"error" : "no stock found"}, status=404)



class SalesViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
    serializer_class = SalesSerializer
    queryset = Sales.objects.all()

    def create(self, request, *args, **kwargs):
        try:
           sales_serializer = self.get_serializer(data=request.data)
           sales_serializer.is_valid(raise_exception=True)
           sales =sales_serializer.save()
        except Exception as error:
            return JsonResponse({"error": str(error)}, status=500)
        
        sales_slz = SalesSerializer(sales)

        return JsonResponse({"data" : sales_slz.data}, status=201)
    
    def list(self, request, id=None, *args, **kwargs):
        if id:
            storestocks = Stock.objects.filter(store_id=id).values_list('id', flat=True)
            sgbs = StockGasBottle.objects.filter(stock_id__in=storestocks).values_list('id', flat=True)
            sales = Sales.objects.filter(stockgasbottle_id__in=sgbs)
            sales_slz = SalesSerializer(sales, many=True)
            return JsonResponse({"results" : sales_slz.data}, status=200)
        else:
            return super().list(request, *args, **kwargs)

class EntriesViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
    serializer_class = EntriesSerializer
    queryset = Entries.objects.all()

    def create(self, request, *args, **kwargs):
        try:
           entries_serializer = self.get_serializer(data=request.data)
           entries_serializer.is_valid(raise_exception=True)
           entries =entries_serializer.save()
        except Exception as error:
            return JsonResponse({"error": str(error)}, status=500)
        
        entries_slz = EntriesSerializer(entries)

        return JsonResponse({"data" : entries_slz.data}, status=201)
    
    def list(self, request, id=None, *args, **kwargs):
        if id:
            storestocks = Stock.objects.filter(store_id=id).values_list('id', flat=True)
            entries = Entries.objects.filter(stock_id__in=storestocks)
            entries_slz = EntriesSerializer(entries, many=True)
            return JsonResponse({"results" : entries_slz.data}, status=200)
        else:
            return super().list(request, *args, **kwargs)




