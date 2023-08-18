from django.contrib import admin

from .models import Room, Message, Notification

admin.site.register(Room)
#admin.site.register(Message)
admin.site.register(Notification)