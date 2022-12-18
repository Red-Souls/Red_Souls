from rest_framework import serializers
from .models import*

class UserSerializer(serializers.ModelSerializer):
    class Meta():
        model = User
        fields = ['id', 'username', 'email', 'password']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta():
        model = UserProfileModel
        fields = '__all__'