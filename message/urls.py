from django.urls import path

from .views import *

urlpatterns = [
    path('room', messageView, name="room"),
    path('room/<str:rh>', roomView, name="room"),
    path('notification', notificationView, name="notification"),
]