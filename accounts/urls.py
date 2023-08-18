from django.urls import path, include

from .views import *

urlpatterns = [
    path('register/', registerView, name="register"),
    path('login/', loginView, name="login"),
    path('logout/', logoutView, name="logout"),

    path('forgot-password/', forgotPasswordView, name="forgot-password"),
    path('f-check-cred/', fCheckCredView, name="f-check-cred"),
    path('f-update-pw/', fUpdatePwView, name="f-update-pw"),

    path('verification/', verificationView, name="verification"),
    path('get-username/', getUsernameView, name="get-username"),

    path('follow/', followView, name="follow"),
    path('unfollow/', unfollowView, name="unfollow"),
]