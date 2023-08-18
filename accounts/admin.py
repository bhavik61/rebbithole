from django.contrib import admin
from .models import User, Following, Followers

admin.site.register(User)
admin.site.register(Following)
admin.site.register(Followers)