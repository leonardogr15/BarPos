# Bebidas/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('cristaleria/', views.CristaleriaListCreateView.as_view(), name='cristaleria-list-create'),
]
