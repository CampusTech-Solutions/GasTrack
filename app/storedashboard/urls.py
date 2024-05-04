from rest_framework import routers
from storedashboard.views import *
from django.conf.urls.static import static
from django.conf import settings

app_name = "storedashboard"

router = routers.DefaultRouter()

router.register(r'storedashboard', DashboardViewSet)

urlpatterns = router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)