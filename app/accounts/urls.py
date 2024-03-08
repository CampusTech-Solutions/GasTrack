from rest_framework import routers
from .api_views import *
from django.conf.urls.static import static

app_name = "accounts"

router = routers.DefaultRouter()

router.register(r'clients', ClientViewSet)
router.register(r'admins', AdminViewSet)
router.register(r'geststores', GestStoreViewSet)


router.register(r'client/login', LoginViewSet)
router.register(r'password-reset',PasswordResetViewSet)
router.register(r'password-reset-success',ResetViewSet)
router.register(r'admin/login', AdminLoginViewSet)
router.register(r'geststore/login', GestStoreLoginViewSet)

router.register(r'client/signup', SignUpViewSet)
router.register(r'admin/signup', AdminSignUpViewSet)
router.register(r'geststore/signup', GestStoreSignUpViewSet)

urlpatterns = router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
