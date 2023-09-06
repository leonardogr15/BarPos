from rest_framework import generics
from .models import Orden,OrdenDetail,OrdenesSerializer
from rest_framework.response import Response
from items.models import Items
from rest_framework import serializers
from base.lib.utils import format_date

class OrdenesListCreateView(generics.ListCreateAPIView):

    def post(self, request, *args, **kwargs):
        orden_con_max_consecutivo = Orden.objects.order_by('-consecutivo').first()
        if orden_con_max_consecutivo is not None:
            nuevo_consecutivo = orden_con_max_consecutivo.consecutivo + 1
        else:
            nuevo_consecutivo = 1

        orden_instance = Orden(
            descripcion='Descripción de la orden',
            mesa=request.data.get('mesa', ''),
            consecutivo=nuevo_consecutivo
        )
        orden_instance.save()

        orden_items_data = request.data.get('orden_items', {})
        for item_id, item_data in orden_items_data.items():

            item = Items.objects.get(id=item_id)
            orden_detail_instance = OrdenDetail(
                orden=orden_instance,
                item=item,
                cantidad=item_data['quantity']
            )
            orden_detail_instance.save()

        serializer = OrdenesSerializer(orden_instance)

        return Response(serializer.data)

    def get(self, request, *args, **kwargs):
        get_Orden = OrdenDetail.objects.all()
        data_Orden = {}

        for orden in get_Orden:
            fecha = format_date(orden.orden.fecha, "%Y-%m-%d %I:%M%p")
            orden_id = orden.orden.consecutivo

            if orden_id not in data_Orden:
                data_Orden[orden_id] = {
                    'consecutivo': orden.orden.consecutivo,
                    'fecha': fecha,
                    'mesa': orden.orden.mesa,
                    'orden_id': orden.orden_id,
                    'items': []
                }

            data_Orden[orden_id]['items'].append({
                'id': orden.item.id,
                'title': orden.item.descripcion,
                'quantity': orden.cantidad,
                'categoria': orden.item.categoria,
                'precio': orden.item.precio,
                'is_activate': orden.item.is_activate,
            })

        return Response(list(data_Orden.values()))

    def get_object(pk):
        try:
            return Orden.objects.get(pk=pk)
        except Orden.DoesNotExist:
            raise 
    
    def put(self, request,pk, *args, **kwargs):
        items_new= request.data.get('orden_items', {})
        item_delete = request.data.get('item_delete',False)
        mesa_new = request.data.get('nueva_mesa')

        if item_delete:
            OrdenDetail.objects.filter(orden_id=pk,item_id=item_delete).delete()

        orden_edit = Orden.objects.filter(id=pk).update(mesa=mesa_new)

        for item_id, data in items_new.items():
            try:
                item_orden = OrdenDetail.objects.filter(orden_id=pk,item_id=item_id).update(cantidad=data.get('quantity'))
            except OrdenDetail.DoesNotExist:
                print('No se modifico la orden')

        return Response(True)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.ordendetail_set.all().delete()  # Elimina todos los detalles de la orden
        instance.delete()  # Elimina la orden en sí
        return Response(True)

class OrdenesRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Orden.objects.all()
    serializer_class = OrdenesSerializer


