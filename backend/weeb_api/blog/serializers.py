from rest_framework import serializers
from .models import Article, Category
from users.models import User
from users.serializers import UserSerializer

# Category Serializer 
class CategorySerializer(serializers.ModelSerializer):
    """_Category serializer_"""
    class Meta:
        model = Category
        fields = ['id', 'name']


#  READ Serializer 
class ArticleReadSerializer(serializers.ModelSerializer):
    """_Article Serializer for reading (GET)_"""
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'created_at', 'author', 'category']


#  WRITE Serializer 
class ArticleWriteSerializer(serializers.ModelSerializer):
    """Article Serializer for writing (POST, PUT, PATCH)"""
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )
    
    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'category_id']
        read_only_fields = ['id']
    
    def validate_title(self, value):
        """Validate title is not empty and has reasonable length"""
        if not value or len(value.strip()) < 3:
            raise serializers.ValidationError('Title must be at least 3 characters long.')
        if len(value) > 255:
            raise serializers.ValidationError('Title cannot exceed 255 characters.')
        return value.strip()
    
    def validate_content(self, value):
        """Validate content is not empty"""
        if not value or len(value.strip()) < 10:
            raise serializers.ValidationError('Content must be at least 10 characters long.')
        return value.strip()
