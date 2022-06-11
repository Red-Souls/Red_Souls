from django.urls import path, include
from rest_framework import routers
from .views import*

router = routers.DefaultRouter()
router.register('profile', ProfileView)
router.register('notification', NotificationView)
router.register('follow', FollowView)
router.register('userfollow', UserFollowView)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('getfollowbyuserview/<int:user_id>/', GetFollowByUserView.as_view()),
    path('getuserfollowbyuserview/<int:user_id>/', GetUserFollowByUserView.as_view()),
]