from django.urls import path, include
from rest_framework import routers
from .views import*

router = routers.DefaultRouter()
router.register('post', PostView)
router.register('comment', CommentView)
router.register('messageroom', MessageRoomView)
router.register('messagechat', MessageChatView)

urlpatterns = [
    path('', include(router.urls)),
    path('getcommentview/<int:post_id>/', GetCommentView.as_view()),
    path('getpostbyuserview/<int:user_id>/', GetPostByUserView.as_view()),
    path('getmessageroomview/<int:user_id>/', GetMessageRoomView.as_view()),
    path('getfollowermessageroomview/<int:user_id>/', GetFollowerMessageRoomView.as_view()),
    path('getmessagechatview/<int:messageroom_id>/', GetMessageChatView.as_view()),
]