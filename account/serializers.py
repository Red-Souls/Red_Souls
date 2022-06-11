from rest_framework.serializers import*
from django.contrib.auth.models import User
from .models import*

class RegisterSerializer(ModelSerializer):
    class Meta():
        model = User
        fields = ['id', 'username', 'email', 'password']

class ProfileSerializer(ModelSerializer):
    class Meta():
        model = Profile
        fields = '__all__'

class NotificationSerializer(ModelSerializer):
    class Meta():
        model = Notification
        fields = '__all__'

class FollowSerializer(ModelSerializer):
    class Meta():
        model = Follow
        fields = '__all__'

class UserFollowSerializer(ModelSerializer):
    class Meta():
        model = UserFollow
        fields = '__all__'