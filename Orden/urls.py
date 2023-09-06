# Bebidas/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('ordenes/', views.OrdenesListCreateView.as_view(), name='ordenes-list-create'),
    path('ordenes-put/<uuid:pk>/', views.OrdenesListCreateView.as_view(), name='ordenes-list-create'),
]
