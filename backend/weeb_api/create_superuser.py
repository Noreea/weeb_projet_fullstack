import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'weeb_api.settings.production')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@example.com')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

if not password:
    print("⚠️ DJANGO_SUPERUSER_PASSWORD not set. Skipping superuser creation.")
else:
    if not User.objects.filter(email=email).exists():
        User.objects.create_superuser(
            email=email,
            password=password
        )
        print(f"✅ Superuser '{email}' created successfully!")
    else:
        print(f"ℹ️ Superuser '{email}' already exists.")
