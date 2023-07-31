# Bebidas/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('cocteles/', views.CoctelesListCreateView.as_view(), name='cocteles-list-create'),
]
