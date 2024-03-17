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
            gasstore = GasStore.objects.create(**message)
            gasstore_data = GasStoreSerializer(gasstore)
            return gasstore_data.data
        except:
            return {"error": "error creating gasstore..."}
    
    @database_sync_to_async
    def update_gas_bottle(self, message, id):
        try:
            Bool = GasStore.objects.filter(id=id).update(**message)
            gasstore = GasStore.objects.get(id=id)
            gasstore_data = GasStoreSerializer(gasstore)
            return gasstore_data.data
        except:
            return {"error": "error updating gasstore..."}

    @database_sync_to_async
    def delete_gas_bottle(self, message):
        try:
            if isinstance(message, int):
                GasStore.objects.get(id=message).delete()
            else:
                GasStore.objects.filter(id__in=message).delete()
            return {"message":"deletion successful !"}
        except Exception as e:
            return {"error":"error deleting gas brand..."}

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
            id = message.pop("id")
            msg = await self.update_gas_bottle(message, id)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": msg}
            )

    @database_sync_to_async
    def create_gas_bottle(self, message):
        try:
            gasbottle = GasBottle.objects.create(**message)
            gasbottle_data = GasBottleSerializer(gasbottle)
            return gasbottle_data.data
        except:
            return {"error": "error creating gasbottle..."}
    
    @database_sync_to_async
    def update_gas_bottle(self, message, id):
        try:
            Bool = GasBottle.objects.filter(id=id).update(**message)
            gasbottle = GasBottle.objects.get(id=id)
            gasbottle_data = GasBottleSerializer(gasbottle)
            return gasbottle_data.data
        except:
            return {"error": "error updating gasbottle..."}

    @database_sync_to_async
    def delete_gas_bottle(self, message):
        try:
            if isinstance(message, int):
                GasBottle.objects.get(id=message).delete()
            else:
                GasBottle.objects.filter(id__in=message).delete()
            return {"message":"deletion successful !"}
        except Exception as e:
            return {"error":"error deleting gas brand..."}

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
            # print(f"gasbrand : {msg}")
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
        print(event)
        gasbrand_data = event["data"]
        await self.send(text_data=json.dumps(gasbrand_data))


class StockGasBottleConsumer(AsyncWebsocketConsumer):
    permission_classes = [IsAuthenticated,]
    groups = ['stockgasbottle']

    async def connect(self):
        self.group_name = 'stockgasbottle'
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get('message')
        action = data.get('action')

        if action == "create":
            stockgasbottle_data = await self.create_or_update_gas_brand(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": stockgasbottle_data}
            )
        elif action == "delete":
            msg = await self.delete_gas_brand(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": msg}
            )
        elif  action == "update":
            id = message.pop("id")
            msg = await self.update_gas_brand(message, id)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": msg}
            )
    async def connect(self):
        self.group_name = 'stockgasbottle'
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get('message')
        action = data.get('action')

        if action == "create":
            stockgasbottle_data = await self.create_stock_gas_bottle(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": stockgasbottle_data}
            )
        elif action == "delete":
            msg = await self.delete_stock_gas_bottle(message)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": msg}
            )
        elif  action == "update":
            id = message.pop("id")
            msg = await self.update_stock_gas_bottle(message, id)
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send.data", "data": msg}
            )

    @database_sync_to_async
    def create_stock_gas_bottle(self, message):
        try:
            stockgasbottle = StockGasBottle.objects.create(**message)
            stockgasbottle_data = StockGasBottleSerializer(stockgasbottle)
            return stockgasbottle_data.data
        except:
            return {"error": "error creating stockgasbottle..."}
    
    @database_sync_to_async
    def update_stock_gas_bottle(self, message, id):
        try:
            Bool = StockGasBottle.objects.filter(id=id).update(**message)
            stockgasbottle = StockGasBottle.objects.get(id=id)
            stockgasbottle_data = StockGasBottleSerializer(stockgasbottle)
            return stockgasbottle_data.data
        except:
            return {"error": "error updating stockgasbottle..."}

    @database_sync_to_async
    def delete_stock_gas_bottle(self, message):
        try:
            if isinstance(message, int):
                StockGasBottle.objects.get(id=message).delete()
            else:
                StockGasBottle.objects.filter(id__in=message).delete()
            return {"message":"deletion successful !"}
        except Exception as e:
            return {"error":"error deleting gas brand..."}

    async def send_data(self, event):
        stockgasbottle_data = event["data"]
        await self.send(text_data=json.dumps(stockgasbottle_data))


