# Comidas/views.py
from rest_framework import generics
from .models import Comidas
from .models import ComidasSerializer
from rest_framework.response import Response

class ComidasListCreateView(generics.ListCreateAPIView):

    def create(self, request, *args, **kwargs):
        data = request.data  
        nueva_bebida = Comidas(descripcion=data['descripcion'], precio=data['precio'],is_activate=True)
        nueva_bebida.save()
        
        return Response(data)
    
    def get(self, request, *args, **kwargs):
        get_comidas = Comidas.objects.all()
        data_comidas =[]
        for comida in get_comidas:
            data_comidas.append({ 'id': comida.id, 'title': comida.descripcion, 'category': comida.precio,'precio':comida.precio, 'imageUrl': "url_imagen_1.jpg" })

        
        return Response(data_comidas)


class ComidasRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comidas.objects.all()
    serializer_class = ComidasSerializer