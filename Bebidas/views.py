# Bebidas/views.py
from rest_framework import generics
from .models import Bebidas
from .models import BebidasSerializer
from rest_framework.response import Response

class BebidasListCreateView(generics.ListCreateAPIView):

    def create(self, request, *args, **kwargs):
        data = request.data  
        nueva_bebida = Bebidas(descripcion=data['descripcion'], precio=data['precio'],is_activate=True)
        nueva_bebida.save()
        
        return Response(data)
    
    def get(self, request, *args, **kwargs):
        
        get_bebidas = Bebidas.objects.all()
        data_bebidas =[]
        for bebida in get_bebidas:
            data_bebidas.append({ 'id': bebida.id, 'title': bebida.descripcion, 'category': bebida.precio,'precio':bebida.precio, 'imageUrl': "url_imagen_1.jpg" })

        return Response(data_bebidas)


class BebidasRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bebidas.objects.all()
    serializer_class = BebidasSerializer
