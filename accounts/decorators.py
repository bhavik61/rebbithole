from django.http import HttpResponse
from django.shortcuts import redirect
from post.models import Member

def unauthenticated(view_func):
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect("/")
        else:
            return view_func(request, *args, **kwargs)
    return wrapper_func

def login_required(view_func):
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_authenticated:
            return view_func(request, *args, **kwargs)            
        else:
            return redirect("/login/")
    return wrapper_func