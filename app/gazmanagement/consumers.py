import json
from gazmanagement.serializers import *
from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework.permissions import IsAuthenticated
from channels.db import database_sync_to_async


class GasStoreConsumer(AsyncWebsocketConsumer):
    permission_classes = [IsAuthenticated,]
    groups = ['gasstores']

    async def connect(self):
        self.group_name = 'gasstores'
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get('message')
        action = data.get('action')

        if action == "create":
            gasstore_data = await self.create_gas_bottle(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": gasstore_data}
            )
        elif action == "delete":
            msg = await self.delete_gas_bottle(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": msg}
            )
        elif  action == "update":
            id = message.pop("id")
            msg = await self.update_gas_bottle(message, id)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": msg}
            )

    @database_sync_to_async
    def create_gas_bottle(self, message):
        try:
            gasstore = GasStore.objects.create(manager_id=message.pop("manager"), **message)
            gasstore_data = GasStoreSerializer(gasstore)
            return gasstore_data.data
        except:
            return {"error": "error creating gas store..."}
    
    @database_sync_to_async
    def update_gas_bottle(self, message, id):
        try:
            Bool = GasStore.objects.filter(id=id).update(**message)
            gasstore = GasStore.objects.get(id=id)
            gasstore_data = GasStoreSerializer(gasstore)
            return gasstore_data.data
        except:
            return {"error": "error updating gas store..."}

    @database_sync_to_async
    def delete_gas_bottle(self, message):
        try:
            if isinstance(message, int):
                GasStore.objects.get(id=message).delete()
            else:
                GasStore.objects.filter(id__in=message).delete()
            return {"message":"deletion successful !"}
        except Exception as e:
            return {"error":"error deleting gas store..."}

    async def send_data(self, event):
        gasstore_data = event["data"]
        await self.send(text_data=json.dumps(gasstore_data))


class GasBottleConsumer(AsyncWebsocketConsumer):
    permission_classes = [IsAuthenticated,]
    groups = ['gasbottles']

    async def connect(self):
        self.group_name = 'gasbottles'
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get('message')
        action = data.get('action')

        if action == "create":
            gasbottle_data = await self.create_gas_bottle(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": gasbottle_data}
            )
        elif action == "delete":
            msg = await self.delete_gas_bottle(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": msg}
            )
        elif  action == "update":
            msg = await self.update_gas_bottle(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": msg}
            )

    @database_sync_to_async
    def create_gas_bottle(self, message):
        try:
            gasbottle = GasBottle.objects.create(brand_id=message.pop("brand"), **message)
            gasbottle_data = GasBottleSerializer(gasbottle)
            return gasbottle_data.data
        except:
            return {"error": "error creating gas bottle..."}
    
    @database_sync_to_async
    def update_gas_bottle(self, message):
        try:
            id = message.pop("id")
            Bool = GasBottle.objects.filter(id=id).update(**message)
            gasbottle = GasBottle.objects.get(id=id)
            gasbottle_data = GasBottleSerializer(gasbottle)
            return gasbottle_data.data
        except:
            return {"error": "error updating gas bottle..."}

    @database_sync_to_async
    def delete_gas_bottle(self, message):
        try:
            if isinstance(message, int):
                GasBottle.objects.get(id=message).delete()
            else:
                GasBottle.objects.filter(id__in=message).delete()
            return {"message":"deletion successful !"}
        except Exception as e:
            return {"error":"error deleting gas bottle..."}

    async def send_data(self, event):
        gasbottle_data = event["data"]
        await self.send(text_data=json.dumps(gasbottle_data))


class GasBrandConsumer(AsyncWebsocketConsumer):
    permission_classes = [IsAuthenticated,]
    groups = ['gasbrands']

    async def connect(self):
        self.group_name = 'gasbrands'
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get('message')
        action = data.get('action')

        if action == "create":
            gasbrand_data = await self.create_gas_brand(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": gasbrand_data}
            )
        elif action == "delete":
            msg = await self.delete_gas_brand(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": msg}
            )
        elif  action == "update":
            msg = await self.update_gas_brand(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": msg}
            )

    @database_sync_to_async
    def create_gas_brand(self, message):
        try:
            gasbrand = GasBrand.objects.create(**message)
            gasbrand_data = GasBrandSerializer(gasbrand)
            return gasbrand_data.data
        except:
            return {"error": "error creating gasbrand..."}

    @database_sync_to_async
    def update_gas_brand(self, message):
        try:
            id = message.pop('id')
            Bool = GasBrand.objects.filter(id=id).update(**message)
            gasbrand = GasBrand.objects.get(id=id)
            gasbrand_data = GasBrandSerializer(gasbrand)
            return gasbrand_data.data
        except:
            return {"error": "error updating gasbrand..."}

    @database_sync_to_async
    def delete_gas_brand(self, message):
        try:
            if isinstance(message, int):
                GasBrand.objects.get(id=message).delete()
            else:
                GasBrand.objects.filter(id__in=message).delete()
            return {"message":"deletion successful !"}
        except Exception as e:
            return {"error":"error deleting gas brand..."}

    async def send_data(self, event):
        gasbrand_data = event["data"]
        await self.send(text_data=json.dumps(gasbrand_data))


class SalesConsumer(AsyncWebsocketConsumer):
    permission_classes = [IsAuthenticated,]
    groups = ['sales']

    
    async def connect(self):
        self.group_name = 'sales'
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get('message')
        action = data.get('action')

        if action == "create":
            sales_data = await self.create_stock_gas_bottle(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": sales_data}
            )
        elif action == "delete":
            msg = await self.delete_stock_gas_bottle(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": msg}
            )
        elif  action == "update":
            msg = await self.update_stock_gas_bottle(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": msg}
            )

    @database_sync_to_async
    def create_stock_gas_bottle(self, message):
        try:
            sales = Sales.objects.create(bottle_id=message.pop("bottle"), stock_id=message.pop("stock"), **message)
            sales_data = SalesSerializer(sales)
            return sales_data.data
        except:
            return {"error": "error creating gas bottle's stock..."}
    
    @database_sync_to_async
    def update_stock_gas_bottle(self, message):
        try:
            id = message.pop("id")
            Bool = Sales.objects.filter(id=id).update(**message)
            sales = Sales.objects.get(id=id)
            sales_data = SalesSerializer(sales)
            return sales_data.data
        except:
            return {"error": "error updating gas bottle's stock..."}

    @database_sync_to_async
    def delete_stock_gas_bottle(self, message):
        try:
            if isinstance(message, int):
                Sales.objects.get(id=message).delete()
            else:
                Sales.objects.filter(id__in=message).delete()
            return {"message":"deletion successful !"}
        except Exception as e:
            return {"error":"error deleting gas bottle's stock..."}

    async def send_data(self, event):
        sales_data = event["data"]
        await self.send(text_data=json.dumps(sales_data))


class EntriesConsumer(AsyncWebsocketConsumer):
    permission_classes = [IsAuthenticated,]
    groups = ['entries']

    
    async def connect(self):
        self.group_name = 'entries'
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get('message')
        action = data.get('action')

        if action == "create":
            entries_data = await self.create_stock_gas_bottle(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": entries_data}
            )
        elif action == "delete":
            msg = await self.delete_stock_gas_bottle(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": msg}
            )
        elif  action == "update":
            msg = await self.update_stock_gas_bottle(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": msg}
            )

    @database_sync_to_async
    def create_stock_gas_bottle(self, message):
        # try:
        entries = Entries.objects.create(bottle_id=message.pop("bottle"), stock_id=message.pop("stock"), **message)
        entries_data = EntriesSerializer(entries)
        return entries_data.data
        # except:
        #     return {"error": "error creating new entriy..."}
    
    @database_sync_to_async
    def update_stock_gas_bottle(self, message):
        try:
            id = message.pop("id")
            Bool = Entries.objects.filter(id=id).update(**message)
            entries = Entries.objects.get(id=id)
            entries_data = EntriesSerializer(entries)
            return entries_data.data
        except:
            return {"error": "error updating gas bottle's stock..."}

    @database_sync_to_async
    def delete_stock_gas_bottle(self, message):
        try:
            if isinstance(message, int):
                Entries.objects.get(id=message).delete()
            else:
                Entries.objects.filter(id__in=message).delete()
            return {"message":"deletion successful !"}
        except Exception as e:
            return {"error":"error deleting gas bottle's stock..."}

    async def send_data(self, event):
        entries_data = event["data"]
        await self.send(text_data=json.dumps(entries_data))


class StockConsumer(AsyncWebsocketConsumer):
    permission_classes = [IsAuthenticated,]
    groups = ['stock']

    
    async def connect(self):
        self.group_name = 'stock'
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get('message')
        action = data.get('action')

        if action == "create":
            stock_data = await self.create_stock(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": stock_data}
            )
        elif action == "delete":
            msg = await self.delete_stock(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": msg}
            )
        elif  action == "update":
            msg = await self.update_stock(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": msg}
            )

    @database_sync_to_async
    def create_stock(self, message):
        try:
            stock = Stock.objects.create(store_id=message.pop("store"), **message)
            stock_data = StockSerializer(stock)
            return stock_data.data
        except:
            return {"error": "error creating gas bottle's stock..."}
    
    @database_sync_to_async
    def update_stock(self, message):
        try:
            id = message.pop("id")
            Bool = Stock.objects.filter(id=id).update(**message)
            stock = Stock.objects.get(id=id)
            stock_data = StockSerializer(stock)
            return stock_data.data
        except:
            return {"error": "error updating gas bottle's stock..."}

    @database_sync_to_async
    def delete_stock(self, message):
        try:
            if isinstance(message, int):
                Stock.objects.get(id=message).delete()
            else:
                Stock.objects.filter(id__in=message).delete()
            return {"message":"deletion successful !"}
        except Exception as e:
            return {"error":"error deleting gas bottle's stock..."}

    async def send_data(self, event):
        stock_data = event["data"]
        await self.send(text_data=json.dumps(stock_data))
