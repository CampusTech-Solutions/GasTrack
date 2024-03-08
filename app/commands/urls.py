from rest_framework import routers
from .api_views import *
from django.conf.urls.static import static

app_name = "commands"

router = routers.DefaultRouter()

router.register(r'commands', CommandViewSet)
router.register(r'payCommands', PayCommandViewSet)

urlpatterns = router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
