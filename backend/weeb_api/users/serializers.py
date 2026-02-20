from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from .models import User


class UserSerializer(serializers.ModelSerializer):
    """User Serializer for basic user data"""
    
    groups = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'is_active', 'is_staff', 'date_joined', 'groups']
        read_only_fields = ['id', 'date_joined', 'is_active', 'is_staff']
    
    def get_groups(self, obj):
        """Return list of group names the user belongs to"""
        return list(obj.groups.values_list('name', flat=True))


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""
    
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password_confirm = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'password_confirm']
    
    def validate_first_name(self, value):
        if len(value) < 2:
            raise serializers.ValidationError('First name must have at least 2 characters.')
        elif len(value) > 50:
            raise serializers.ValidationError('First name cannot exceed 50 characters.')
        return value
    
    def validate_last_name(self, value):
        if len(value) < 2:
            raise serializers.ValidationError('Last name must have at least 2 characters.')
        elif len(value) > 50:
            raise serializers.ValidationError('Last name cannot exceed 50 characters.')
        return value
    
    def validate(self, attrs):
        """Validate that passwords match"""
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        """Create inactive user (admin must activate)"""
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            is_active=False  # Explicitly set to False
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom JWT token serializer that:
    1. Refuses login for inactive users
    2. Adds custom claims to the token payload
    """
    
    def validate(self, attrs):
        # Get user before calling parent validate
        user = User.objects.filter(email=attrs.get('email')).first()
        
        # Check if user exists and is active
        if user and not user.is_active:
            raise serializers.ValidationError(
                'Your account is inactive. Please contact an administrator for activation.'
            )
        
        # Call parent validate to get tokens
        data = super().validate(attrs)
        
        # Add custom claims
        data['user'] = {
            'id': self.user.id,
            'email': self.user.email,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'is_staff': self.user.is_staff,
            'is_active': self.user.is_active,
            'groups': list(self.user.groups.values_list('name', flat=True))
        }
        
        return data
    
    @classmethod
    def get_token(cls, user):
        """Add custom claims to token payload"""
        token = super().get_token(user)
        
        # Add custom claims
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['is_staff'] = user.is_staff
        token['groups'] = list(user.groups.values_list('name', flat=True))
        
        return token