# Bebidas/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('items/', views.ItemsListCreateView.as_view(), name='items-list-create'),
]
