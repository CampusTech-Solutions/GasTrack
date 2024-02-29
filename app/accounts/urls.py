from rest_framework import routers
from .api_views import *
from django.conf.urls.static import static

app_name = "accounts"

router = routers.DefaultRouter()

router.register(r'clients', ClientViewSet)
router.register(r'login', LoginViewSet)
router.register(r'signup', SignUpViewSet)

urlpatterns = router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
