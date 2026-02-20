from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from blog.models import Article


class Command(BaseCommand):
    help = 'Create default groups with permissions'

    def handle(self, *args, **kwargs):
        # Create Moderators group
        moderators_group, created = Group.objects.get_or_create(name='Moderators')
        
        if created:
            self.stdout.write(self.style.SUCCESS('Created Moderators group'))
            
            # Get Article content type
            article_content_type = ContentType.objects.get_for_model(Article)
            
            # Get all permissions for Article
            article_permissions = Permission.objects.filter(content_type=article_content_type)
            
            # Add all article permissions to Moderators group
            moderators_group.permissions.set(article_permissions)
            
            self.stdout.write(self.style.SUCCESS(
                f'Added {article_permissions.count()} permissions to Moderators group'
            ))
        else:
            self.stdout.write(self.style.WARNING('Moderators group already exists'))
        
        self.stdout.write(self.style.SUCCESS('Setup completed successfully'))
