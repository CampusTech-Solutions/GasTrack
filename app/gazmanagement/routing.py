from django.urls import re_path
from gazmanagement import consumers

websocket_urlpatterns = [
    re_path(r'ws/gasstore/$', consumers.GasStoreConsumer.as_asgi()),
    re_path(r'ws/gasbottle/$', consumers.GasBottleConsumer.as_asgi()),
    re_path(r'ws/gasbrand/$', consumers.GasBrandConsumer.as_asgi()),
    re_path(r'ws/entries/$', consumers.EntriesConsumer.as_asgi()),
    re_path(r'ws/sales/$', consumers.SalesConsumer.as_asgi()),
    re_path(r'ws/stock/$', consumers.StockConsumer.as_asgi()),
]
