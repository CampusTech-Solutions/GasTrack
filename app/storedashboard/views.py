from rest_framework import viewsets, permissions
from storedashboard.serializers import *
from django.http import JsonResponse
from django.db import transaction
from django.shortcuts import redirect

class DashboardViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
    serializer_class = Fact_Sales_Serializer
    queryset = fact_sales.objects.all()