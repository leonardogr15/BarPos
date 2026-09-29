# BarPos

Para el desarrollo del proyecto se requiere Python 3.9.0 y node v18.16.1

paquetes de pip instalados:

Package             Version
------------------- -------
asgiref             3.7.2
Django              4.2.3
django-cors-headers 4.2.0
djangorestframework 3.14.0
pip                 23.2.1
psycopg2            2.9.6
pytz                2023.3
setuptools          68.0.0
sqlparse            0.4.4
typing_extensions   4.7.1
tzdata              2023.3
wheel               0.41.0

Para la aplicacion frontend requiere la instalacion de 
*npm install react-router-dom
*npm install react-icons


## Configuración local del backend

Desde esta carpeta, instala las dependencias con `python -m pip install -r requirements.txt`.
Copia `.env.example` a `.env` y completa `SECRET_KEY`, `DB_NAME`, `DB_USER` y
`DB_PASSWORD` con tus valores locales. Genera una clave nueva con:

```sh
python -c "import secrets; print(secrets.token_urlsafe(64))"
```

El backend carga `.env` desde esta carpeta, independientemente del directorio
 de ejecución. Las variables de entorno tienen prioridad sobre el archivo.
`SECRET_KEY` es obligatoria; `DEBUG` queda en `False` si no se especifica.
Activa `DEBUG=True` únicamente para depuración local. Configura `ALLOWED_HOSTS`
con los nombres de host permitidos, separados por comas.
Valida la configuración con `python manage.py check`.
Nunca copies secretos al frontend: las variables de React se incluyen en los
archivos que recibe el navegador.

Reemplaza la clave Django expuesta también en cualquier entorno desplegado;
el cambio puede invalidar sesiones y firmas existentes. Si la contraseña
PostgreSQL publicada sigue en uso, cámbiala en PostgreSQL y actualiza
`DB_PASSWORD`. Mover secretos a `.env` no los rota ni elimina el historial Git.
