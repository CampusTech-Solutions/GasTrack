from django.contrib import admin
from .models import *

class CommandAdmin(admin.ModelAdmin):
    model = Command

class PayCommandAdmin(admin.ModelAdmin):
    model = PayCommand


admin.site.register(Command, CommandAdmin)
admin.site.register(PayCommand, PayCommandAdmin)
