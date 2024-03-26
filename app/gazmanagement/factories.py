import random
import factory
import django_factory_boy
from factory.django import DjangoModelFactory
from django_factory_boy.auth import UserFactory
from faker import Faker
from accounts.models import *
from gazmanagement.models import *
from django.contrib.gis.geos import Point
from django.db import transaction

fake = Faker()



class ClientFactory(UserFactory):
    class Meta:
        model = Client
    
    no_cni = factory.Sequence(lambda n: fake.unique.random_number(digits=10))
    phone_No = factory.Sequence(lambda n: fake.unique.phone_number())
    code = factory.Sequence(lambda n: fake.random_number(digits=6))



class GestStoreFactory(ClientFactory):
    class Meta:
        model = GestStore
    
    matricule = factory.Sequence(lambda n: fake.random_number(digits=8))



class GasStoreFactory(DjangoModelFactory):
    class Meta:
        model = GasStore
    
    name = factory.Sequence(lambda n: fake.company())
    manager = factory.SubFactory(GestStoreFactory)
    store_status = factory.Sequence(lambda n: fake.random_element(elements=(True, False)))
    infos = factory.Sequence(lambda n: fake.sentence(nb_words=10))



class StockFactory(DjangoModelFactory):
    class Meta:
        model = Stock
    
    name = factory.Sequence(lambda n: fake.sentence(nb_words=4))
    store = factory.SubFactory(GasStoreFactory)
    label = factory.Sequence(lambda n: fake.sentence(nb_words=15))


class GasBrandFactory(DjangoModelFactory):
    class Meta:
        model = GasBrand
    
    name = factory.Sequence(lambda n: fake.company()+" Gas")
    compagny = factory.Sequence(lambda n: fake.company())


class GasBottleFactory(DjangoModelFactory):
    class Meta:
        model = GasBottle

    brand = factory.SubFactory(GasBrandFactory)
    weight = factory.Sequence(lambda n: fake.random_element(elements=(6, 12.5, 25)))



class EntriesFactory(DjangoModelFactory):
    class Meta:
        model = Entries
    
    stock = factory.SubFactory(StockFactory)
    bottle = factory.SubFactory(GasBottleFactory)
    quantity = random.randint(1, 1000)
    unit_cost_price = random.randint(2000, 20000)
    unit_selling_price = unit_cost_price + random.randint(500, 2500)


def seed_database(num=5):
    for _ in range(num):
        with transaction.atomic():
            entries = EntriesFactory.create()  # Use create() instead of ()

# @staticmethod
# def fill_database(num=4):
#     gas_store_ids = GasStore.objects.all().values_list('id', flat=True)
#     for gs_id in gas_store_ids:
#         for _ in range(num):
#             with transaction.atomic():
#                 new_stock = Stock.objects.create(
#                     store_id=gs_id,
#                     name='Nouveau Stock - '+str(random.randint(1, 10000)),
#                     label="Nouveau Libelé - "+str(random.randint(1, 100))
#                 )
#                 gasbottle = GasBottle.objects.get(id=random.randint(1, 20))
#                 sgb = StockGasBottle.objects.create(
#                     stock=new_stock,
#                     bottle=gasbottle,
#                     quantity=random.randint(1, 99),
#                     supplementary_fee=random.randint(100, 999)
#                 )

