#!/bin/bash

echo "🚀 Setting up Weeb Backend..."

# Navigate to Django project directory
cd weeb_api

# Run migrations
echo "📦 Running migrations..."
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
echo "👤 Create superuser? (y/n)"
read create_superuser
if [ "$create_superuser" = "y" ]; then
    python manage.py createsuperuser
fi

# Setup groups and permissions
echo "🔐 Setting up groups and permissions..."
python manage.py setup_groups

# Create some test categories
echo "📚 Creating test categories..."
python manage.py shell << EOF
from blog.models import Category
categories = ['Technology', 'Design', 'Development', 'Business', 'Lifestyle']
for cat_name in categories:
    Category.objects.get_or_create(name=cat_name)
print(f"Created {len(categories)} categories")
EOF

echo "✅ Setup complete!"
echo ""
echo "To start the server, run:"
echo "  python manage.py runserver"
