from datetime import datetime
import pytz
from backend.settings import TIME_ZONE

def format_date(date,format):
    fecha_hora_utc = datetime.strptime(str(date), '%Y-%m-%d %H:%M:%S.%f%z')
    zona_horaria_bogota = pytz.timezone(TIME_ZONE)
    fecha_hora_bogota = fecha_hora_utc.astimezone(zona_horaria_bogota)
    formato_deseado = format
    fecha_hora_formateada = fecha_hora_bogota.strftime(formato_deseado)

    return fecha_hora_formateada