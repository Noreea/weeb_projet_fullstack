from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Article
from .serializers import ArticleReadSerializer, ArticleWriteSerializer
from users.models import User
from .models import Category

class BlogViewSet(viewsets.ModelViewSet):
    """
    __ViewSet to handle Articles__
    Define automatically:
        GET (/blog/) --> list()
        GET (/blog/{id}) --> retrieve()
        POST (/blog/) --> create()
        PUT (/blog/{id}) --> update()
        PATCH (/blog/{id}) --> partial_update()
        DELETE (/blog/{id} --> destroy()
    """
    queryset = Article.objects.all()
    
    # Dynamically choose serializer depending on action
    # Appelé automatiquement par django dès qu'il y a self.get_serializer()
    def get_serializer_class(self):
        # Utilise le serializer d'écriture pour les méthodes de modification, sinon celui de lecture
        if self.action in ['create', 'update', 'partial_update']:
            return ArticleWriteSerializer
        return ArticleReadSerializer

    # Route /blog/ | Method GET
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        # Vérifie s'il n'y a pas d'articles
        if not queryset.exists():
            return Response({
                'success': False,
                'results': 'No articles found.'
            }, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'success': True,
            'results': serializer.data
        }, status=status.HTTP_200_OK)

    # Route /blog/{id} | Method GET
    def retrieve(self, request, *args, **kwargs):
        article = self.get_object()  # récupère l'objet avec l'id spécifié
        serializer = self.get_serializer(article)
        return Response({
            'success': True,
            'results': serializer.data
        }, status=status.HTTP_200_OK)
        
    #Route /blog/ | Method POST
    def create(self, request, *args, **kwargs):
        author_id = request.data.get('author_id')
        category_id = request.data.get('category_id')
        
        #Check if author_id is in the payload
        if not author_id:
            return Response({
                'success': False,
                'message': 'author_id is required.'
            }, status = status.HTTP_400_BAD_REQUEST)
        
        #check if catefory_id is in the payload
        if not category_id:
            return Response({
                'success' : False,
                'message' : 'category_id is required.'
            }, status = status.HTTP_400_BAD_REQUEST)
        
        #check if author exist
        try:
            User.objects.get(pk = author_id)
        except User.DoesNotExist:
            return Response({
                'success': False,
                'message': 'This author does not exist.'
            }, status = status.HTTP_404_NOT_FOUND)
        
        #check if catergory exist
        try:
            Category.objects.get(pk = category_id)
        except Category.DoesNotExist:
            return Response({
                'success': False,
                'message': 'This Catagory does not exist.'
            }, status = status.HTTP_404_NOT_FOUND)
            
        serializer = self.get_serializer(data = request.data)  
        serializer.is_valid(raise_exception = True) 
        self.perform_create(serializer)
        
        return Response({
            'success': True,
            'message': 'Article created successfully.',
            'results': serializer.data
        }, status=status.HTTP_201_CREATED)
        
