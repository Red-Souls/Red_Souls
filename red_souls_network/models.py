from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class PostModel(models.Model):
    author = models.ForeignKey(User, on_delete = models.CASCADE)
    title = models.CharField(max_length = 116)
    content = models.TextField()
    image = models.ImageField(null = True, blank = True)
    date = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.title

class CommentModel(models.Model):
    post = models.ForeignKey(PostModel, on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    username = models.CharField(max_length = 116)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add = True)

class NotificationModel(models.Model):
    sender = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'sender')
    sendername = models.CharField(max_length = 116)
    receiver = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'receiver')
    content = models.TextField()
    date = models.DateTimeField(auto_now_add = True)

class ChatRoomModel(models.Model):
    chatRoomName = models.CharField(max_length = 116)
    members = models.ManyToManyField(User)

class ChatMessageModel(models.Model):
    chatRoom = models.ForeignKey(ChatRoomModel, on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    username = models.CharField(max_length = 116)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add = True)