from rest_framework import viewsets, status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import Http404

from .models import User
from .serializers import UserSerializer, RegisterSerializer, CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    """
    POST /api/auth/register/
    Public endpoint to register a new user (inactive by default)
    """
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return Response({
            'success': True,
            'message': 'Registration successful. Your account is pending activation by an administrator.',
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'is_active': user.is_active
            }
        }, status=status.HTTP_201_CREATED)


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    POST /api/token/
    Obtain JWT tokens (access + refresh)
    Refuses login for inactive users
    """
    serializer_class = CustomTokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    POST /api/auth/logout/
    Blacklist the refresh token
    """
    try:
        refresh_token = request.data.get('refresh_token')
        if not refresh_token:
            return Response({
                'success': False,
                'message': 'Refresh token is required.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        token = RefreshToken(refresh_token)
        token.blacklist()
        
        return Response({
            'success': True,
            'message': 'Logout successful.'
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'success': False,
            'message': 'Invalid token or token already blacklisted.'
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me_view(request):
    """
    GET /api/auth/me/
    Get current user info + roles
    """
    user = request.user
    serializer = UserSerializer(user)
    
    return Response({
        'success': True,
        'user': serializer.data
    }, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet to handle Users (Admin only)
    GET /api/users/ --> list()
    GET /api/users/{id}/ --> retrieve()
    POST /api/users/ --> create()
    PUT /api/users/{id}/ --> update()
    PATCH /api/users/{id}/ --> partial_update()
    DELETE /api/users/{id}/ --> destroy()
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    
    def list(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.queryset, many=True)
        
        if not self.queryset.exists():
            return Response({
                'success': False,
                'results': 'No users found.'
            }, status=status.HTTP_404_NOT_FOUND)
        
        return Response({
            'success': True,
            'results': serializer.data
        }, status=status.HTTP_200_OK)
    
    def retrieve(self, request, *args, **kwargs):
        try:
            user = self.get_object()
        except Http404:
            return Response({
                'success': False,
                'results': 'No user found.'
            }, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.serializer_class(user)
        
        return Response({
            'success': True,
            'results': serializer.data
        }, status=status.HTTP_200_OK)
