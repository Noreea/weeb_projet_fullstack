from django.db import models


class Review(models.Model):
    """
    Independent review model for contact form submissions.
    No user relationship - supports both authenticated and anonymous users.
    Includes predicted satisfaction score from ML model.
    """
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    message = models.TextField()
    predicted_satisfaction = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'review'

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.created_at.strftime('%Y-%m-%d')}"
