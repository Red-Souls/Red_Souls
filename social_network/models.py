from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    userId = models.ForeignKey(User, on_delete = models.CASCADE)
    title = models.CharField(max_length = 116)
    content = models.TextField()
    image = models.ImageField()
    date = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    username = models.CharField(max_length = 116)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.user

class MessageRoom(models.Model):
    firstTalker = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'firstTalker')
    firstTalkerName = models.CharField(max_length = 116)
    secondTalker = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'secondTalker')
    secondTalkerName = models.CharField(max_length = 116)
    date = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.firstTalker

class MessageChat(models.Model):
    messageRoom = models.ForeignKey(MessageRoom, on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    username = models.CharField(max_length = 116)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.user