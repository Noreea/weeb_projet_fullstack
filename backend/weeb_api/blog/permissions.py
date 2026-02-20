from rest_framework import permissions


class IsOwnerOrModeratorOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow:
    - The author of an article to edit/delete it
    - Moderators (users in 'Moderators' group) to edit/delete any article
    - Admins (is_staff=True) to edit/delete any article
    """
    
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Check if user is admin
        if request.user.is_staff:
            return True
        
        # Check if user is in Moderators group
        if request.user.groups.filter(name='Moderators').exists():
            return True
        
        # Check if user is the author
        return obj.author == request.user


class IsActiveUser(permissions.BasePermission):
    """
    Custom permission to only allow active users to perform write operations.
    """
    
    def has_permission(self, request, view):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions require authenticated AND active user
        return request.user and request.user.is_authenticated and request.user.is_active
