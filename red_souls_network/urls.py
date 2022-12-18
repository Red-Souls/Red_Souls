from django.urls import path, include
from .views import*
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('post', PostView)
router.register('comment', CommentView)
router.register('notification', NotificationView)
router.register('chatroom', ChatRoomView)
router.register('chatmessage', ChatMessageView)

urlpatterns = [
    path('', include(router.urls)),
    path('getcomment/<int:postId>/', GetCommentView.as_view()),
    path('getnotificationbyreceiver/', GetNotificationByReceiverView.as_view()),
    path('getchatroom/', GetChatRoomView.as_view()),
    path('getchatmessage/<int:id>/', GetChatMessageView.as_view()),
]