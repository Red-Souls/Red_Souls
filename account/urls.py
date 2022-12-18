from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import*

router = DefaultRouter()
router.register('userprofile', UserProfileView)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('getusertoken/', GetUserTokenView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('addfriend/', AddFriendView.as_view()),
    path('deletefriend/', DeleteFriendView.as_view()),
]