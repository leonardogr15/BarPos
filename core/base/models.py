from django.db import models
import uuid
from settings import settings

class Base(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    creation_date = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Esto asume que estás utilizando el modelo User de Django

    class Meta:
        abstract = True
