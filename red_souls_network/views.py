from django.shortcuts import render
from .serializers import*
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from account.models import UserTokenModel
from rest_framework.status import*

# Create your views here.
class PostView(ModelViewSet):
    queryset = PostModel.objects.all().order_by('-date')
    serializer_class = PostSerializer

class CommentView(ModelViewSet):
    queryset = CommentModel.objects.all().order_by('-date')
    serializer_class = CommentSerializer

class GetCommentView(APIView):
    def get(self, request, postId):
        comment = CommentModel.objects.filter(post = postId)
        serializer = CommentSerializer(comment, many = True)
        return Response(serializer.data)

class NotificationView(ModelViewSet):
    queryset = NotificationModel.objects.all().order_by('-date')
    serializer_class = NotificationSerializer

class GetNotificationByReceiverView(APIView):
    def get(self, request):
        token = request.COOKIES.get('refreshToken')
        userTokenModel = UserTokenModel.objects.get(refreshToken = token)
        receiverId = User.objects.get(id = userTokenModel.id)
        notification = NotificationModel.objects.filter(receiver = receiverId).order_by('-date')
        serializer = NotificationSerializer(notification, many = True)
        return Response(serializer.data)

class ChatRoomView(ModelViewSet):
    queryset = ChatRoomModel.objects.all()
    serializer_class = ChatRoomSerializer

class GetChatRoomView(APIView):
    def get(self, request):
        token = request.COOKIES.get('refreshToken')
        userTokenModel = UserTokenModel.objects.get(refreshToken = token)
        user = User.objects.get(id = userTokenModel.id)
        chatroom = ChatRoomModel.objects.filter(members = user)
        serializer = ChatRoomSerializer(chatroom, many = True)
        return Response(serializer.data)

class ChatMessageView(ModelViewSet):
    queryset = ChatMessageModel.objects.all().order_by('-date')
    serializer_class = ChatMessageSerializer

class GetChatMessageView(APIView):
    def get(self, request, id):
        chatMessage = ChatMessageModel.objects.filter(chatRoom = id).order_by('-date')
        serializer = ChatMessageSerializer(chatMessage, many = True)
        return Response(serializer.data)
