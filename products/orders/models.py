from django.db import models
from products.items.models import Items
import uuid
from django.db import models
from core.base.models import Base
from rest_framework import serializers

class Orden(Base):
    mesa = models.CharField(max_length=100, null=True)
    consecutivo = models.IntegerField(default=0, null=False,blank=False)

class OrdenDetail(models.Model):
    orden = models.ForeignKey(Orden, on_delete=models.CASCADE)
    item = models.ForeignKey(Items, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1)
