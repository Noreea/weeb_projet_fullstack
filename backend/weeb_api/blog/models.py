from django.db import models
from users.models import User

# Create your models here.

#Category entity
class Category(models.Model):
    """_Category Entity_

    Fields:
        name (str)
    """
    
    name = models.CharField(max_length=20)
    
    def __str__(self):
        return self.name


#Artcicle Entity
class Article(models.Model):
    """_Article entity_

    Fields:
        title (str)
        content (str)
        created_at (datetime)
        user_id (foreign key)
        category_id (foreign key) 
    """
    
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add = True) #add current datetime when create a new article
    author = models.ForeignKey(User, related_name = 'articles', on_delete= models.CASCADE) #add author field --> foreign key linked to User
    category = models.ForeignKey(Category, related_name = 'articles', on_delete = models.PROTECT) # add category field --> foreign key link to Category (entity)
    
    def __str__(self):
        return self.title
    