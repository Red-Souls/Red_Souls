from django.shortcuts import render
from rest_framework.viewsets import*
from .serializers import*
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import*

# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()

        user = serializer.save()
        Token.objects.create(user = user)
        profile = Profile()
        profile.user = user
        profile.username = profile.user.username
        profile.email = profile.user.email
        profile.save()

        return Response(serializer.data)
        

class LoginView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']

        try:
            user = User.objects.get(username = username, password = password)
        except:
            raise ValidationError('user not found !')
        
        userToken = user.auth_token.key
            
        return Response({
            'token': userToken,
            'id': user.id,
        })

class ProfileView(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

class NotificationView(ModelViewSet):
    queryset = Notification.objects.all().order_by('-date')
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

class FollowView(ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

class GetFollowByUserView(APIView):
    def get(self, request, userId):
        follow = Follow.objects.filter(follower = userId).order_by('-date')
        serializer = FollowSerializer(follow, many = True)
        return Response(serializer.data)

class UserFollowView(ModelViewSet):
    queryset = UserFollow.objects.all()
    serializer_class = UserFollowSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

class GetUserFollowByUserView(APIView):
    def get(self, request, userId):
        userfollow = UserFollow.objects.filter(user = userId).order_by('-date')
        serializer = UserFollowSerializer(userfollow, many = True)
        return Response(serializer.data)