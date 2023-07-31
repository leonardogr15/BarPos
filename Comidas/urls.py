# Bebidas/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('comidas/', views.ComidasListCreateView.as_view(), name='comidas-list-create'),
]
