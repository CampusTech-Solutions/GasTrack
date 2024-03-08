from django.contrib import admin
from .models import *

class CommandAdmin(admin.ModelAdmin):
    model = Command

class PayCommandAdmin(admin.ModelAdmin):
    model = PayCommand

class BasketAdmin(admin.ModelAdmin):
    model = Basket

admin.site.register(Command, CommandAdmin)
admin.site.register(PayCommand, PayCommandAdmin)
admin.site.register(Basket, BasketAdmin)
