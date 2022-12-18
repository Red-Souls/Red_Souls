from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import*
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import*
from rest_framework.viewsets import ModelViewSet
from .serializers import*

# Create your views here.
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            user = serializer.save()
            refreshToken = RefreshToken.for_user(user)
            userTokenModel = UserTokenModel()
            userTokenModel.refreshToken = refreshToken
            userTokenModel.save()
            userProfile = UserProfileModel()
            userProfile.user = user
            userProfile.username = user.username
            userProfile.image = None
            userProfile.save()
            return Response('User created successfully !', status = HTTP_201_CREATED)
        return Response('User created unsuccessfully !', status = HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.get(email = email, password = password)
        refreshToken = RefreshToken.for_user(user)
        userTokenModel = UserTokenModel.objects.get(id = user.id)
        userTokenModel.refreshToken = refreshToken
        userTokenModel.save()
        response = Response()
        response.set_cookie(key = 'refreshToken', value = refreshToken, httponly = True, secure = True, samesite = 'strict')
        response.data = {
            'message': 'Logon Successfully !'
        }
        response.status_code = HTTP_200_OK
        return response

class GetUserTokenView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        token = request.COOKIES.get('refreshToken')
        userTokenModel = UserTokenModel.objects.get(refreshToken = token)
        user = User.objects.get(id = userTokenModel.id)
        refreshToken = RefreshToken.for_user(user)
        userTokenModel.refreshToken = refreshToken
        userTokenModel.save()
        response = Response()
        response.set_cookie(key = 'refreshToken', value = refreshToken, httponly = True, secure = True, samesite = 'strict')
        response.data = {
            'accessToken': str(refreshToken.access_token),
            'id': user.id,
            'name': user.username,
        }
        response.status_code = HTTP_200_OK
        return response

class LogoutView(APIView):
    def get(self, request):
        response = Response()
        response.set_cookie(key = 'refreshToken', value = '', httponly = True, secure = True, samesite = 'strict')
        response.data = {
            'message': 'Logout Successfully !'
        }
        response.status_code = HTTP_200_OK
        return response

class UserProfileView(ModelViewSet):
    queryset = UserProfileModel.objects.all()
    serializer_class = UserProfileSerializer

class AddFriendView(APIView):
    def post(self, request):
        try:
            user = request.data['user']
            friend = request.data['friend']
            userProfile = UserProfileModel.objects.get(id = user)
            userProfile.friends.add(friend)
            friendProfile = UserProfileModel.objects.get(id = friend)
            friendProfile.friends.add(user)
            return Response('Added new friend successfully !')
        except:
            return Response('Added new friend unsuccessfully !')

class DeleteFriendView(APIView):
    def post(self, request):
        try:
            user = request.data['user']
            friend = request.data['friend']
            userProfile = UserProfileModel.objects.get(id = user)
            userProfile.friends.remove(friend)
            friendProfile = UserProfileModel.objects.get(id = friend)
            friendProfile.friends.remove(user)
            return Response('Unfriend successfully !')
        except:
            return Response('Unfriend unsuccessfully !')