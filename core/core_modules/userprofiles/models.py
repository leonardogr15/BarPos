from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from core.base.models import Base


class UserProfile(Base,AbstractBaseUser):
    code = models.CharField(max_length=100, blank=True, null=True, unique=True)
    is_superuser = models.BooleanField(default=False)
    authorization = models.CharField(max_length=255, blank=True, null=True)
    username = models.CharField(max_length=150, unique=True, default='default_username')

    USERNAME_FIELD = 'code'
    REQUIRED_FIELDS = ['username','is_superuser']

    def __str__(self):
        return f'{self.name}'
    

    class Meta:
        db_table = 'auth_user'




