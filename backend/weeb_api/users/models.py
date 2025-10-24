from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# Create your models here.

class UserManager(BaseUserManager):
    """__Custom manager for User entity__
    (c’est une classe spéciale qui définit comment créer ou chercher des objets (ici c'est pour users))
    
    Methods: 
        - create_user (hérité de BaseUserManager): créer un utilisateur lambda
            --> 
            --> Vérifier que l'email est présent
            --> Normalise l’email (TEST@GMAIL.COM → test@gmail.com)
            --> crée un objet user
            --> hash le mot de passe (depuis la méthode parent)
        
        -create_superuser (hérité de BaseUserManager) : crée un super utilisateur django
            --> force is_staff et is_acgtiv a True
            --> appel de create_user()
            --> 
    """

    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        """Create and return an normal user """
        #If email is not present reaise an error
        if not email:
            raise ValueError('email is required.') 

        email = self.normalize_email(email) # normalize email
        user = self.model(email=email, first_name=first_name, last_name=last_name, **extra_fields) # new User object (without password because it will be not hashed before saving in database)
        
        if password:
            user.set_password(password)  # Hashing pasword here
        else:
            raise ValueError('Password is required.')
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name='Admin', last_name='User', password=None, **extra_fields):
        """create and return a superuser"""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, first_name, last_name, password, **extra_fields)








#Custom user entity 
class User(AbstractBaseUser, PermissionsMixin):
    """_User Entity_

    Args:
        first_name (str): user's firstname
        last_name (str): user's lastname
        email (str): user's email --> unique
        password (str)
    """
    
    first_name = models.CharField(max_length = 50)
    last_name = models.CharField(max_length = 50)
    email = models.EmailField(unique = True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = UserManager()

    USERNAME_FIELD = 'email' #use email to login
    REQUIRED_FIELDS = ['first_name', 'last_name'] #make these fields mandatory chan using python manage.py createsuperuser

    
    class Meta:
        db_table = 'users' #the table name in the DB

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"
    
    