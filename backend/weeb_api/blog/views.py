from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .models import Article, Category
from .serializers import ArticleReadSerializer, ArticleWriteSerializer, CategorySerializer
from .permissions import IsOwnerOrModeratorOrAdmin, IsActiveUser
from users.models import User


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Categories (Read-only for all users)
    GET /api/categories/ --> list()
    GET /api/categories/{id}/ --> retrieve()
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class BlogViewSet(viewsets.ModelViewSet):
    """
    ViewSet to handle Articles with permissions:
    - Public: can read (GET list + retrieve)
    - Authenticated + Active: can create articles
    - Author/Moderator/Admin: can update/delete articles
    
    GET /api/articles/ --> list()
    GET /api/articles/{id}/ --> retrieve()
    POST /api/articles/ --> create() [requires active user]
    PUT /api/articles/{id}/ --> update() [requires owner/moderator/admin]
    PATCH /api/articles/{id}/ --> partial_update() [requires owner/moderator/admin]
    DELETE /api/articles/{id}/ --> destroy() [requires owner/moderator/admin]
    """
    queryset = Article.objects.all().select_related('author', 'category').order_by('-created_at')
    
    def get_serializer_class(self):
        """Use different serializers for read vs write operations"""
        if self.action in ['create', 'update', 'partial_update']:
            return ArticleWriteSerializer
        return ArticleReadSerializer
    
    def get_permissions(self):
        """
        Set permissions based on action:
        - list/retrieve: public (IsAuthenticatedOrReadOnly)
        - create: authenticated + active users only
        - update/partial_update/destroy: owner/moderator/admin only
        """
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticatedOrReadOnly]
        elif self.action == 'create':
            permission_classes = [IsAuthenticated, IsActiveUser]
        else:  # update, partial_update, destroy
            permission_classes = [IsAuthenticated, IsActiveUser, IsOwnerOrModeratorOrAdmin]
        
        return [permission() for permission in permission_classes]
    
    def list(self, request, *args, **kwargs):
        """GET /api/articles/ - List all articles"""
        queryset = self.get_queryset()
        
        if not queryset.exists():
            return Response({
                'success': False,
                'results': 'No articles found.'
            }, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'success': True,
            'count': queryset.count(),
            'results': serializer.data
        }, status=status.HTTP_200_OK)
    
    def retrieve(self, request, *args, **kwargs):
        """GET /api/articles/{id}/ - Get single article"""
        article = self.get_object()
        serializer = self.get_serializer(article)
        return Response({
            'success': True,
            'results': serializer.data
        }, status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        """POST /api/articles/ - Create new article (active users only)"""
        # Check if user is active
        if not request.user.is_active:
            return Response({
                'success': False,
                'message': 'Your account must be activated by an administrator before you can create articles.'
            }, status=status.HTTP_403_FORBIDDEN)
        
        # Get category_id from request
        category_id = request.data.get('category_id')
        
        if not category_id:
            return Response({
                'success': False,
                'message': 'category_id is required.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if category exists
        try:
            Category.objects.get(pk=category_id)
        except Category.DoesNotExist:
            return Response({
                'success': False,
                'message': 'This category does not exist.'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Create article with current user as author
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        article = serializer.save(author=request.user)
        
        # Return with read serializer to include full author/category data
        read_serializer = ArticleReadSerializer(article)
        
        return Response({
            'success': True,
            'message': 'Article created successfully.',
            'results': read_serializer.data
        }, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        """PUT /api/articles/{id}/ - Full update (owner/moderator/admin)"""
        partial = kwargs.pop('partial', False)
        article = self.get_object()
        
        # Check object-level permission
        self.check_object_permissions(request, article)
        
        serializer = self.get_serializer(article, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        # Return with read serializer
        read_serializer = ArticleReadSerializer(article)
        
        return Response({
            'success': True,
            'message': 'Article updated successfully.',
            'results': read_serializer.data
        }, status=status.HTTP_200_OK)
    
    def partial_update(self, request, *args, **kwargs):
        """PATCH /api/articles/{id}/ - Partial update (owner/moderator/admin)"""
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        """DELETE /api/articles/{id}/ - Delete article (owner/moderator/admin)"""
        article = self.get_object()
        
        # Check object-level permission
        self.check_object_permissions(request, article)
        
        article_title = article.title
        article.delete()
        
        return Response({
            'success': True,
            'message': f'Article "{article_title}" deleted successfully.'
        }, status=status.HTTP_200_OK)
