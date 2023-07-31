# Copteles/views.py
from rest_framework import generics
from .models import Cristaleria
from .models import CristaleriaSerializer
from rest_framework.response import Response

class CristaleriaListCreateView(generics.ListCreateAPIView):

    def create(self, request, *args, **kwargs):
        data = request.data  
        nueva_bebida = Cristaleria(descripcion=data['descripcion'], precio=data['precio'],is_activate=True)
        nueva_bebida.save()
        
        return Response(data)
    
    def get(self, request, *args, **kwargs):
        get_Cristaleria = Cristaleria.objects.all()
        data_Cristaleria =[]
        for comida in get_Cristaleria:
            data_Cristaleria.append({ 'id': comida.id, 'title': comida.descripcion, 'category': comida.precio,'precio':comida.precio, 'imageUrl': "url_imagen_1.jpg" })

        
        return Response(data_Cristaleria)


class CristaleriaRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cristaleria.objects.all()
    serializer_class = CristaleriaSerializer