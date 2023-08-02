from django.db import models
from items.models import Items

class Orden(models.Model):
    # Campos de la Orden
    fecha = models.DateField(auto_now_add=True)
    items = models.ManyToManyField(Items, blank=True)
    descripcion = models.CharField(max_length=100, null=True)
    mesa = models.CharField(max_length=100, null=True)
