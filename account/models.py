from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    username = models.CharField(max_length = 116)
    email = models.EmailField()
    image = models.ImageField(null = True)

    def __str__(self):
        return self.username

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    username = models.CharField(max_length = 116)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add = True)
    
    def __str__(self):
        return self.username

class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'follower')
    followerName = models.CharField(max_length = 116)
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'user')
    username = models.CharField(max_length = 116)
    date = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.follower

class UserFollow(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    userFollow = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'userFollow')
    usernameFollow = models.CharField(max_length = 116)
    date = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.user