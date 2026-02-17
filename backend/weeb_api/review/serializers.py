from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    """
    Review Serializer
    """

    class Meta:
        model = Review
        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'phone',
            'message',
            'predicted_satisfaction',
            'created_at',
        ]
        read_only_fields = ['id', 'predicted_satisfaction', 'created_at']
