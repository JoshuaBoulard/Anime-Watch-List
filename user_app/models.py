from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import JSONField

# Create your models here.
class App_User(AbstractUser):
    email = models.EmailField(blank = False, null = False, unique = True)
    name = models.CharField(max_length=255, null = False, blank = False)
    profile_image = models.TextField(default='')
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.name} | {self.email}"

class Anime_list(models.Model):
    title = models.CharField(blank=False, null=False, max_length=255)
    completed = models.BooleanField(default=False)
    personal_notes = models.TextField()
    user = models.ForeignKey(App_User, on_delete=models.CASCADE)
    data = JSONField(default=False)

    def __str__(self):
        return f"{self.title} | {self.user}"