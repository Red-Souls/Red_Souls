from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserTokenModel(models.Model):
    refreshToken = models.TextField()

class UserProfileModel(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    username = models.CharField(max_length = 116)
    description = models.TextField()
    image = models.ImageField(null = True, blank = True)
    friends = models.ManyToManyField(User, blank = True, null = True, related_name = 'friends')