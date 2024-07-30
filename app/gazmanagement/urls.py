from django.urls import path
from rest_framework import routers
from gazmanagement.views import *
from django.conf.urls.static import static
from django.conf import settings

app_name = "gasmanagement"

router = routers.DefaultRouter()

router.register(r'gasstore', GasStoreViewSet)
router.register(r'sales', SalesViewSet)
router.register(r'entries', EntriesViewSet)
router.register(r'stock', StockViewSet)
router.register(r'brand', GasBrandViewSet)
router.register(r'gasbottle', GasBottleViewSet)
router.register(r'stockgasbottle', StockGasBottleViewSet)

urlpatterns = router.urls

# urlpatterns += [
    
#     path('gasstore/', GasStoreViewSet.as_view({'get': 'list'}), name='gasstore-list'),
#     path('gasstore/new/', GasStoreViewSet.as_view({'post': 'create'}), name='gasstore-create'),
#     path('gasstore/<int:id>/', GasStoreViewSet.as_view({'get': 'retrieve'}), name='gasstore-retrieve'),
#     path('gasstore/update/<int:id>/', GasStoreViewSet.as_view({'patch': 'partial_update'}), name='gasstore-update'),
#     path('gasstore/delete/<int:id>/', GasStoreViewSet.as_view({'delete': 'destroy'}), name='gasstore-destroy'),

#     path('stockgasbottle/<int:id>/', StockGasBottleViewSet.as_view({'get': 'list'}), name='gasbottle-list'),
#     path('gasbottle/', GasBottleViewSet.as_view({'get': 'list'}), name='gasbottle-list'),
#     path('gasbottle/new/', GasBottleViewSet.as_view({'post': 'create'}), name='gasbottle-create'),
#     path('gasbottle/<int:id>/', GasBottleViewSet.as_view({'get': 'retrieve'}), name='gasbottle-retrieve'),
#     path('gasbottle/update/<int:id>/', GasBottleViewSet.as_view({'patch': 'partial_update'}), name='gasbottle-update'),
#     path('gasbottle/delete/<int:id>/', GasBottleViewSet.as_view({'delete': 'destroy'}), name='gasbottle-destroy'),

#     path('brand/', GasBrandViewSet.as_view({'get': 'list'}), name='brand-list'),
#     path('brand/new/', GasBrandViewSet.as_view({'post': 'create'}), name='brand-create'),
#     path('brand/<int:id>/', GasBrandViewSet.as_view({'get': 'retrieve'}), name='brand-retrieve'),
#     path('brand/update/<int:id>/', GasBrandViewSet.as_view({'patch': 'partial_update'}), name='brand-update'),
#     path('brand/delete/<int:id>/', GasBrandViewSet.as_view({'delete': 'destroy'}), name='brand-destroy'),

#     path('sales/', SalesViewSet.as_view({'get': 'list'}), name='sales-list'),
#     path('sales/store/<int:id>/', SalesViewSet.as_view({'get': 'list'}), name='sales-list'),
#     path('sales/new/', SalesViewSet.as_view({'post': 'create'}), name='sales-create'),
#     path('sales/<int:id>/', SalesViewSet.as_view({'get': 'retrieve'}), name='sales-retrieve'),
#     path('sales/update/<int:id>/', SalesViewSet.as_view({'patch': 'partial_update'}), name='sales-update'),
#     path('sales/delete/<int:id>/', SalesViewSet.as_view({'delete': 'destroy'}), name='sales-destroy'),
    
#     path('entries/', EntriesViewSet.as_view({'get': 'list'}), name='entries-list'),
#     path('entries/store/<int:id>/', EntriesViewSet.as_view({'get': 'list'}), name='entries-list'),
#     path('entries/new/', EntriesViewSet.as_view({'post': 'create'}), name='entries-create'),
#     path('entries/<int:id>/', EntriesViewSet.as_view({'get': 'retrieve'}), name='entries-retrieve'),
#     path('entries/update/<int:id>/', EntriesViewSet.as_view({'patch': 'partial_update'}), name='entries-update'),
#     path('entries/delete/<int:id>/', EntriesViewSet.as_view({'delete': 'destroy'}), name='entries-destroy'),

#     path('stock/', StockViewSet.as_view({'get': 'list'}), name='stock-list'),
#     path('stock/new/', StockViewSet.as_view({'post': 'create'}), name='stock-create'),
#     path('stock/<int:id>/', StockViewSet.as_view({'get': 'retrieve'}), name='stock-retrieve'),
#     path('stock/update/<int:id>/', StockViewSet.as_view({'patch': 'partial_update'}), name='stock-update'),
#     path('stock/delete/<int:id>/', StockViewSet.as_view({'delete': 'destroy'}), name='stock-destroy'),

#     path('getstore/', GasStoreViewSet.as_view({'get': 'retrievestore'}), name='retrieve-manager-store'),
# ]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
