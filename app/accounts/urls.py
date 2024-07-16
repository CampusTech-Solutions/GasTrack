from rest_framework import routers
from .api_views import *
from django.conf.urls.static import static

app_name = "accounts"

router = routers.DefaultRouter()

router.register(r'clients', ClientViewSet)
router.register(r'admins', AdminViewSet,basename='admin')
router.register(r'geststores', GestStoreViewSet,basename='geststore')
router.register(r'login', LoginViewSet,basename='login')
router.register(r'password-reset',PasswordResetViewSet,basename='password-reset')
router.register(r'password-reset-success',ResetViewSet,basename='password-reset-success')
router.register(r'admin/login', AdminLoginViewSet,basename='admin-login')
router.register(r'geststore/login', GestStoreLoginViewSet,basename='geststore-login')

router.register(r'signup', SignUpViewSet,basename='signup')
router.register(r'admin/signup', AdminSignUpViewSet,basename='admin-signup')
router.register(r'geststore/signup', GestStoreSignUpViewSet,basename='geststore-signup')

urlpatterns = router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
