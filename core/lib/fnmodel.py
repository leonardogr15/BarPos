from django.core.management import call_command

def opal_migrateall(commit=False):
    from django.conf import settings
    for app in settings.INSTALLED_APPS:
        print('-migrating =>', app.split('.')[-1:][0])
        call_command('makemigrations', app.split('.')[-1:][0])
        print('')
    if commit:
        for app in settings.INSTALLED_APPS:
            call_command('migrate', app.split('.')[-1:][0])
