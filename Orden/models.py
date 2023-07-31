from django.db import models
from Bebidas.models import Bebidas
from Comidas.models import Comidas
from Cocteles.models import Cocteles
from Cristaleria.models import Cristaleria

class Orden(models.Model):
    # Campos de la Orden
    fecha = models.DateField(auto_now_add=True)
    bebidas = models.ManyToManyField(Bebidas, blank=True)
    comida = models.ManyToManyField(Comidas, blank=True)
    cocteles = models.ManyToManyField(Cocteles, blank=True)
    cristaleria = models.ManyToManyField(Cristaleria, blank=True)
    descripcion = models.CharField(max_length=100, null=True)
    mesa = models.CharField(max_length=100, null=True)
