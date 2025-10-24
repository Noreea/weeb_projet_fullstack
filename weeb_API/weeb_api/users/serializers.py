from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    """__User Serializer__
    """
    
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        min_length=6,
        error_messages={
            'required':'Password is required.',
            'min_length': 'Password must be at least 6 characters long.'
        }
    )
    
    class Meta:
        model = User
        fields= ['id', 'first_name', 'last_name', 'email', 'password']
        
    #first_name validator
    def validate_first_name(self, value):
        
        if(len(value) < 2):
            raise serializers.ValidationError('first_name must have at least 3 caracters.')
        elif(len(value) > 50):
            raise serializers.ValidationError('first_name cannot exeed 50 caracters.')
        
        return value

    #last_name validator
    def validate_last_name(self, value):
       
        if(len(value) < 2):
            raise serializers.ValidationError('last_name must have at least 3 caracters.')
        elif(len(value) > 50):
            raise serializers.ValidationError('last_name cannot exeed 50 caracters.')
        
        return value