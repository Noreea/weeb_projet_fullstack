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
    """_Article Serializer for writing (POST, PUT, PATCH)_"""
    author_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='author',  # indique que l'ID mappe sur le champ 'author' de l'Article
        write_only=True
    )
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',  # mappe sur le champ 'category'
        write_only=True
    )
    
    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'created_at', 'author_id', 'category_id']
