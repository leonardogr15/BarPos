from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from core.base.models import Base


class UserProfileManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, code, password, **extra_fields):
        if not code:
            raise ValueError('The code must be set')
        user = self.model(code=code, **extra_fields)
        if user.owner_id is None:
            user.owner_id = user.id
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, code, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(code, password, **extra_fields)

    def create_superuser(self, code, password=None, **extra_fields):
        extra_fields['is_superuser'] = True
        return self._create_user(code, password, **extra_fields)


class UserProfile(Base,AbstractBaseUser):
    code = models.CharField(max_length=100, blank=True, null=True, unique=True)
    is_superuser = models.BooleanField(default=False)
    authorization = models.CharField(max_length=255, blank=True, null=True)
    username = models.CharField(max_length=150, unique=True, default='default_username')

    objects = UserProfileManager()

    USERNAME_FIELD = 'code'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f'{self.name}'

    @property
    def is_staff(self):
        return self.is_superuser

    def has_perm(self, perm, obj=None):
        return self.is_active and self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_active and self.is_superuser
    

    class Meta:
        db_table = 'auth_user'




