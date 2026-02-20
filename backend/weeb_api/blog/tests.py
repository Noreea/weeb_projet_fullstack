import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from blog.models import Article, Category

User = get_user_model()


@pytest.mark.django_db
class TestArticlePermissions:
    """Test article CRUD operations with permissions"""
    
    def setup_method(self):
        """Setup test client and test data"""
        self.client = APIClient()
        self.articles_url = reverse('article-list')
        
        # Create category
        self.category = Category.objects.create(name='Tech')
        
        # Create users
        self.inactive_user = User.objects.create_user(
            email='inactive@example.com',
            first_name='Inactive',
            last_name='User',
            password='password123',
            is_active=False
        )
        
        self.active_user = User.objects.create_user(
            email='active@example.com',
            first_name='Active',
            last_name='User',
            password='password123',
            is_active=True
        )
        
        self.other_user = User.objects.create_user(
            email='other@example.com',
            first_name='Other',
            last_name='User',
            password='password123',
            is_active=True
        )
        
        self.moderator = User.objects.create_user(
            email='moderator@example.com',
            first_name='Moderator',
            last_name='User',
            password='password123',
            is_active=True
        )
        moderators_group, _ = Group.objects.get_or_create(name='Moderators')
        self.moderator.groups.add(moderators_group)
        
        self.admin_user = User.objects.create_user(
            email='admin@example.com',
            first_name='Admin',
            last_name='User',
            password='password123',
            is_active=True,
            is_staff=True
        )
        
        # Create test article
        self.article = Article.objects.create(
            title='Test Article',
            content='This is test content for the article.',
            author=self.active_user,
            category=self.category
        )
        
        self.article_detail_url = reverse('article-detail', kwargs={'pk': self.article.pk})
    
    def test_public_can_read_articles(self):
        """Test that unauthenticated users can read articles"""
        response = self.client.get(self.articles_url)
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['success'] is True
        assert len(response.data['results']) > 0
    
    def test_create_article_without_auth_refused(self):
        """Test that unauthenticated users cannot create articles"""
        data = {
            'title': 'New Article',
            'content': 'New article content',
            'category_id': self.category.id
        }
        
        response = self.client.post(self.articles_url, data)
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_create_article_inactive_user_refused(self):
        """Test that inactive users cannot create articles"""
        self.client.force_authenticate(user=self.inactive_user)
        
        data = {
            'title': 'New Article',
            'content': 'New article content',
            'category_id': self.category.id
        }
        
        response = self.client.post(self.articles_url, data)
        
        assert response.status_code == status.HTTP_403_FORBIDDEN
    
    def test_create_article_active_user_success(self):
        """Test that active users can create articles"""
        self.client.force_authenticate(user=self.active_user)
        
        data = {
            'title': 'New Article by Active User',
            'content': 'This is new content created by an active user.',
            'category_id': self.category.id
        }
        
        response = self.client.post(self.articles_url, data)
        
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['success'] is True
        assert response.data['results']['title'] == data['title']
        assert response.data['results']['author']['email'] == self.active_user.email
    
    def test_update_article_by_other_user_refused(self):
        """Test that users cannot update articles they don't own"""
        self.client.force_authenticate(user=self.other_user)
        
        data = {
            'title': 'Updated Title',
            'content': 'Updated content',
            'category_id': self.category.id
        }
        
        response = self.client.put(self.article_detail_url, data)
        
        assert response.status_code == status.HTTP_403_FORBIDDEN
    
    def test_update_article_by_author_success(self):
        """Test that authors can update their own articles"""
        self.client.force_authenticate(user=self.active_user)
        
        data = {
            'title': 'Updated by Author',
            'content': 'Updated content by the original author',
            'category_id': self.category.id
        }
        
        response = self.client.put(self.article_detail_url, data)
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['success'] is True
        assert response.data['results']['title'] == data['title']
    
    def test_update_article_by_moderator_success(self):
        """Test that moderators can update any article"""
        self.client.force_authenticate(user=self.moderator)
        
        data = {
            'title': 'Updated by Moderator',
            'content': 'Updated content by a moderator',
            'category_id': self.category.id
        }
        
        response = self.client.put(self.article_detail_url, data)
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['success'] is True
        assert response.data['results']['title'] == data['title']
    
    def test_update_article_by_admin_success(self):
        """Test that admins can update any article"""
        self.client.force_authenticate(user=self.admin_user)
        
        data = {
            'title': 'Updated by Admin',
            'content': 'Updated content by an admin',
            'category_id': self.category.id
        }
        
        response = self.client.put(self.article_detail_url, data)
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['success'] is True
        assert response.data['results']['title'] == data['title']
    
    def test_delete_article_by_other_user_refused(self):
        """Test that users cannot delete articles they don't own"""
        self.client.force_authenticate(user=self.other_user)
        
        response = self.client.delete(self.article_detail_url)
        
        assert response.status_code == status.HTTP_403_FORBIDDEN
    
    def test_delete_article_by_author_success(self):
        """Test that authors can delete their own articles"""
        # Create new article for this test
        article = Article.objects.create(
            title='Article to Delete',
            content='This article will be deleted',
            author=self.active_user,
            category=self.category
        )
        url = reverse('article-detail', kwargs={'pk': article.pk})
        
        self.client.force_authenticate(user=self.active_user)
        response = self.client.delete(url)
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['success'] is True
        assert not Article.objects.filter(pk=article.pk).exists()
    
    def test_delete_article_by_moderator_success(self):
        """Test that moderators can delete any article"""
        # Create new article for this test
        article = Article.objects.create(
            title='Article to Delete by Moderator',
            content='This article will be deleted by moderator',
            author=self.active_user,
            category=self.category
        )
        url = reverse('article-detail', kwargs={'pk': article.pk})
        
        self.client.force_authenticate(user=self.moderator)
        response = self.client.delete(url)
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['success'] is True
        assert not Article.objects.filter(pk=article.pk).exists()
