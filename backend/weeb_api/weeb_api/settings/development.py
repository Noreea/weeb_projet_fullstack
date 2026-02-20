"""
Django settings for weeb_api project - DEVELOPMENT configuration.
"""

from .base import *

SECRET_KEY = 'django-insecure-5b*0yn7%a=)irjot7ixg+xwu#8w^sft4r+w&4r5c8ufuv4=(k('

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# Database - SQLite for development
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# CORS - Allow local frontend
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# JWT signing key
SIMPLE_JWT['SIGNING_KEY'] = SECRET_KEY