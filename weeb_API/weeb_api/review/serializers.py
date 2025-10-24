from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    """
    Serializer for contact form data.
    Direct mapping to Review model fields.
    """
    class Meta:
        model = Review
        fields = ['id', 'first_name', 'last_name', 'email', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
