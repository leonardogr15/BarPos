import uuid
from django.db import models
from rest_framework import serializers


class Bebidas(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    descripcion = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    is_activate = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.descripcion} - ${self.precio}"
    
class BebidasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bebidas
        fields = '__all__'
