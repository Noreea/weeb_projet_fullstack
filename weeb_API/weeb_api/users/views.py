from django.shortcuts import render
from rest_framework import viewsets, status
from .models import User
from rest_framework.response import Response
from .serializers import UserSerializer
from django.http import Http404

# Create your views here
class UserViewSet(viewsets.ModelViewSet):
    """
    __ViewSet to handle Users__
    Define automatically:
        GET (/users) --> list()
        GET (/users/{id}) --> retrieve()
        POST (/users) --> create()
        PUT (/users/{id}) --> update()
        PATCH (/users/{id}) --> partiel_update()
        DELETE (/users/{id} --> destroy()
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    # Route /users | Method GET
    def list(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.queryset, many=True)
        
        if not self.queryset.exists():
            return Response({
            'sucess': False,
            'results': 'No users found.'
        },status = status.HTTP_404_NOT_FOUND)
            
        else:
            return Response({
            'success': True,
            'results': serializer.data
        }, status= status.HTTP_200_OK)
    
    #Route /users/{id} | Method GET
    def retrieve(self, request, *args, **kwargs):
        
        try:
            user = self.get_object() # get the object with the specified id
            
        except Http404: # Allow catching 404 exception, set this current error message instead of the framework auto response
            return Response({
                'success': False,
                'results': 'No user found.'
            },  status = status.HTTP_404_NOT_FOUND)
        
        serializer = self.serializer_class(user)
        
        return Response({
            'success' : True,
            'results': serializer.data
        }, status = status.HTTP_200_OK)
        