import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db
class TestAuthentication:
    """Test authentication endpoints"""
    
    def setup_method(self):
        """Setup test client and test data"""
        self.client = APIClient()
        self.register_url = reverse('register')
        self.login_url = reverse('token_obtain_pair')
        self.me_url = reverse('me')
        
        self.valid_user_data = {
            'email': 'test@example.com',
            'first_name': 'Test',
            'last_name': 'User',
            'password': 'TestPass123!',
            'password_confirm': 'TestPass123!'
        }
    
    def test_register_creates_inactive_user(self):
        """Test that registration creates an inactive user"""
        response = self.client.post(self.register_url, self.valid_user_data)
        
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['success'] is True
        assert 'pending activation' in response.data['message'].lower()
        
        user = User.objects.get(email=self.valid_user_data['email'])
        assert user.is_active is False
        assert user.first_name == self.valid_user_data['first_name']
    
    def test_register_with_mismatched_passwords(self):
        """Test registration fails with mismatched passwords"""
        data = self.valid_user_data.copy()
        data['password_confirm'] = 'DifferentPassword123!'
        
        response = self.client.post(self.register_url, data)
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_register_with_existing_email(self):
        """Test registration fails with existing email"""
        User.objects.create_user(
            email=self.valid_user_data['email'],
            first_name='Existing',
            last_name='User',
            password='password123'
        )
        
        response = self.client.post(self.register_url, self.valid_user_data)
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_login_inactive_user_refused(self):
        """Test that inactive users cannot login"""
        # Create inactive user
        User.objects.create_user(
            email=self.valid_user_data['email'],
            first_name=self.valid_user_data['first_name'],
            last_name=self.valid_user_data['last_name'],
            password=self.valid_user_data['password'],
            is_active=False
        )
        
        response = self.client.post(self.login_url, {
            'email': self.valid_user_data['email'],
            'password': self.valid_user_data['password']
        })
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'inactive' in str(response.data).lower()
    
    def test_login_active_user_success(self):
        """Test that active users can login and receive tokens"""
        # Create active user
        User.objects.create_user(
            email=self.valid_user_data['email'],
            first_name=self.valid_user_data['first_name'],
            last_name=self.valid_user_data['last_name'],
            password=self.valid_user_data['password'],
            is_active=True
        )
        
        response = self.client.post(self.login_url, {
            'email': self.valid_user_data['email'],
            'password': self.valid_user_data['password']
        })
        
        assert response.status_code == status.HTTP_200_OK
        assert 'access' in response.data
        assert 'refresh' in response.data
        assert 'user' in response.data
        assert response.data['user']['email'] == self.valid_user_data['email']
    
    def test_access_protected_endpoint_without_token(self):
        """Test accessing protected endpoint without token returns 401"""
        response = self.client.get(self.me_url)
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_access_protected_endpoint_with_token(self):
        """Test accessing protected endpoint with valid token"""
        # Create active user and login
        user = User.objects.create_user(
            email=self.valid_user_data['email'],
            first_name=self.valid_user_data['first_name'],
            last_name=self.valid_user_data['last_name'],
            password=self.valid_user_data['password'],
            is_active=True
        )
        
        login_response = self.client.post(self.login_url, {
            'email': self.valid_user_data['email'],
            'password': self.valid_user_data['password']
        })
        
        access_token = login_response.data['access']
        
        # Access protected endpoint
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        response = self.client.get(self.me_url)
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['success'] is True
        assert response.data['user']['email'] == self.valid_user_data['email']
