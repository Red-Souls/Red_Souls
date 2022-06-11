from django.shortcuts import render
from rest_framework.viewsets import*
from rest_framework.permissions import*
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import*

# Create your views here.
class PostView(ModelViewSet):
    queryset = Post.objects.all().order_by('-date')
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

class CommentView(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

class GetCommentView(APIView):
    def get(self, request, postId):
        comment = Comment.objects.filter(post = postId).order_by('-date')
        serializer = CommentSerializer(comment, many = True)
        return Response(serializer.data)

class GetPostByUserView(APIView):
    def get(self, request, userId):
        post = Post.objects.filter(userId = userId).order_by('-date')
        serializer = PostSerializer(post, many = True)
        return Response(serializer.data)

class MessageRoomView(ModelViewSet):
    queryset = MessageRoom.objects.all().order_by('-date')
    serializer_class = MessageRoomSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

class GetMessageRoomView(APIView):
    def get(self, request, userId):
        messageroom = MessageRoom.objects.filter(firstTalker = userId).order_by('-date')
        serializer = MessageRoomSerializer(messageroom, many = True)
        return Response(serializer.data)

class GetFollowerMessageRoomView(APIView):
    def get(self, request, userId):
        messageroom = MessageRoom.objects.filter(secondTalker = userId).order_by('-date')
        serializer = MessageRoomSerializer(messageroom, many = True)
        return Response(serializer.data)

class MessageChatView(ModelViewSet):
    queryset = MessageChat.objects.all().order_by('-date')
    serializer_class = MessageChatSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

class GetMessageChatView(APIView):
    def get(self, request, messageRoomId):
        messagechat = MessageChat.objects.filter(messageRoom = messageRoomId).order_by('-date')
        serializer = MessageChatSerializer(messagechat, many = True)
        return Response(serializer.data)