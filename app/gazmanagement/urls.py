from rest_framework import routers
from .views import *
from django.conf.urls.static import static
from django.conf import settings

app_name = "gasmanagement"

router = routers.DefaultRouter()


urlpatterns = router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
