from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.decorators import action
from django.conf import settings


class CommandViewSet(viewsets.ModelViewSet):

    queryset = Command.objects.all()
    serializer_class = CommandSerializer

class PayCommandViewSet(viewsets.ModelViewSet):

    queryset = PayCommand.objects.all()
    serializer_class = PayCommandSerializer