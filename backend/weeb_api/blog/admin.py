from django.contrib import admin
from .models import Article, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Admin for Categories"""
    list_display = ['id', 'name']
    search_fields = ['name']


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    """Admin for Articles"""
    list_display = ['id', 'title', 'author', 'category', 'created_at']
    list_filter = ['category', 'created_at', 'author']
    search_fields = ['title', 'content', 'author__email', 'author__first_name', 'author__last_name']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {'fields': ('title', 'content')}),
        ('Metadata', {'fields': ('author', 'category', 'created_at')}),
    )
    
    readonly_fields = ['created_at']