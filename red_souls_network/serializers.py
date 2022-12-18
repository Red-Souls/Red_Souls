from rest_framework import serializers
from .models import*

class PostSerializer(serializers.ModelSerializer):
    class Meta():
        model = PostModel
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta():
        model = CommentModel
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta():
        model = NotificationModel
        fields = '__all__'

class ChatRoomSerializer(serializers.ModelSerializer):
    class Meta():
        model = ChatRoomModel
        fields = '__all__'

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta():
        model = ChatMessageModel
        fields = '__all__'