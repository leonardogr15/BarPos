# Copteles/views.py
from rest_framework import generics
from .models import Items
from .models import ItemsSerializer
from rest_framework.response import Response

class ItemsListCreateView(generics.ListCreateAPIView):

    def create(self, request, *args, **kwargs):
        data = request.data  
        nueva_item = Items(descripcion=data['descripcion'], precio=data['precio'],is_activate=True)
        nueva_item.save()
        
        return Response(data)
    
    def get(self, request, *args, **kwargs):
        get_Items = Items.objects.all()
        data_Items =[]
        for item in get_Items:
            data_Items.append({ 'id': item.id, 'title': item.descripcion, 'category': item.categoria, 'precio':item.precio, 'imageUrl': "url_imagen_1.jpg" })

        
        return Response(data_Items)


class ItemsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Items.objects.all()
    serializer_class = ItemsSerializer