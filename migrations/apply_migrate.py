import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)) + '/../')

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings.settings")

import django
django.setup()

from core.lib.fnmodel import opal_migrateall

def main():
    opal_migrateall()

if __name__ == "__main__":
    main()
