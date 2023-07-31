# Bebidas/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('bebidas/', views.BebidasListCreateView.as_view(), name='bebidas-list-create'),
]
