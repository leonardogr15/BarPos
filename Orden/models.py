from django.db import models
from items.models import Items
import uuid
from django.db import models
from rest_framework import serializers

class Orden(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fecha = models.DateTimeField(auto_now_add=True)
    items = models.ManyToManyField(Items, blank=True)
    descripcion = models.CharField(max_length=100, null=True)
    mesa = models.CharField(max_length=100, null=True)
    consecutivo = models.IntegerField(default=0, null=False,blank=False)
    alive = models.BooleanField(default=True)

class OrdenDetail(models.Model):
    orden = models.ForeignKey(Orden, on_delete=models.CASCADE)
    item = models.ForeignKey(Items, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1)

class OrdenesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orden
        fields = '__all__'