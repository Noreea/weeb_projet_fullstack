from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    UserViewSet,
    RegisterView,
    CustomTokenObtainPairView,
    logout_view,
    me_view
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    # Auth endpoints
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', logout_view, name='logout'),
    path('auth/me/', me_view, name='me'),
    
    # User management (admin only)
    path('', include(router.urls)),
]
