# Copteles/views.py
from rest_framework import generics
from .models import Cocteles
from .models import CoctelesSerializer
from rest_framework.response import Response

class CoctelesListCreateView(generics.ListCreateAPIView):

    def create(self, request, *args, **kwargs):
        data = request.data  
        nueva_bebida = Cocteles(descripcion=data['descripcion'], precio=data['precio'],is_activate=True)
        nueva_bebida.save()
        
        return Response(data)
    
    def get(self, request, *args, **kwargs):
        get_Cocteles = Cocteles.objects.all()
        data_Cocteles =[]
        for comida in get_Cocteles:
            data_Cocteles.append({ 'id': comida.id, 'title': comida.descripcion, 'category': comida.precio,'precio':comida.precio, 'imageUrl': "url_imagen_1.jpg" })

        
        return Response(data_Cocteles)


class CoctelesRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cocteles.objects.all()
    serializer_class = CoctelesSerializer