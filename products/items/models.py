import uuid
from django.db import models
from core.base.models import Base
from rest_framework import serializers


class Items(Base):
    
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    categoria = models.CharField(max_length=100)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.descripcion} - ${self.precio}"
    
