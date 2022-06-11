from rest_framework.serializers import*
from .models import*

class PostSerializer(ModelSerializer):
    class Meta():
        model = Post
        fields = '__all__'

class CommentSerializer(ModelSerializer):
    class Meta():
        model = Comment
        fields = '__all__'

class MessageRoomSerializer(ModelSerializer):
    class Meta():
        model = MessageRoom
        fields = '__all__'

class MessageChatSerializer(ModelSerializer):
    class Meta():
        model = MessageChat
        fields = '__all__'