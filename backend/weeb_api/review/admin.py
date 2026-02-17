from django.contrib import admin
from .models import Review

# Register your models here.
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email', 'phone', 'predicted_satisfaction', 'created_at']
    list_filter = ['created_at', 'predicted_satisfaction']
    search_fields = ['first_name', 'last_name', 'email', 'phone']
    readonly_fields = ['predicted_satisfaction', 'created_at']
