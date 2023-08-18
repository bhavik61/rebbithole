from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse

from django.contrib.auth import authenticate, login, logout
#stuff to send email
from django.core.mail import EmailMessage, send_mail
from django.conf import settings
from django.template.loader import render_to_string
import random

from message.models import Notification
from .models import User, Following, Followers
from .forms import RegisterUserForm

from .decorators import unauthenticated, login_required

@unauthenticated
def registerView(request):
    form = RegisterUserForm()
    context = {
        "form" : form,
        "register" : 1,   
    }
    return render(request, 'accounts/register.html', context)

@unauthenticated
def verificationView(request):
    if request.method == "POST":
        form = RegisterUserForm(request.POST)
        if form.is_valid():
            username = request.POST['username']
            un = User.objects.filter(username=username)

            if not un:
                user = form.save()

                otp = random.randint(0,9999)
                print('otp')
                print(otp)
                
                # mail_body = "<h3><b>Thanks for signing up to REBBITHOLE!</b></h3><h4>Vefify your email address to activate your REBBITHOLE account</h4><h5>Your confirmation code is</h4><h3><b> "+str(otp)+" </b></h3>"
                # mail = EmailMessage(
                #     'Confirm your email address',
                #     mail_body,
                #     settings.EMAIL_HOST_USER,
                #     [user.email],
                # )
                # mail.fail_silently=False
                # mail.content_subtype = "html"
                # mail.send()

                context = {
                    'otp' : otp,
                    'email' : user.email,
                    'verification' : 1,
                }
                return render(request, 'accounts/verification.html', context)
    #return render(request, 'accounts/verification.html',{"otp":"9098", "verification" : 1, 'email' : 'user@email.com',})
    form = RegisterUserForm()
    context = {
        "form" : form,
        "register" : 1,
        'email' : 'user@email.com',
    }
    return redirect('/register')

@unauthenticated
def loginView(request):
    if request.method == "POST":
        #email = request.POST['email']
        username = request.POST['username']
        password = request.POST['password']
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/')

    context = {
        "login" : 1,   
    }
    return render(request, 'accounts/login.html', context)

@unauthenticated
def forgotPasswordView(request):
    return render(request, 'accounts/forgot-p.html')

@unauthenticated
def fCheckCredView(request):
    if request.method=="POST":
        username = request.POST['username']
        email = request.POST['email']
        user = User.objects.filter(username=username, email=email)

        if user:
            user = User.objects.get(username=username, email=email)
            
            otp = random.randint(0,9999)
            print('otp')
            print(otp)
            
            mail_body = "<h3><b>Thanks for signing up to REBBITHOLE!</b></h3><h4>Vefify your email address to activate your REBBITHOLE account</h4><h5>Your confirmation code is</h4><h3><b> "+str(otp)+" </b></h3>"
            mail = EmailMessage(
                'Confirm your email address',
                mail_body,
                settings.EMAIL_HOST_USER,
                [email],
            )
            mail.fail_silently=False
            mail.content_subtype = "html"
            mail.send()

            return JsonResponse({"user":"exist", "email":email, "otp":otp})

        return JsonResponse({"ok":"not"})

@unauthenticated
def fUpdatePwView(request):
    if request.method == "POST":
        pw = request.POST['pw']
        username = request.POST['username']

        user = User.objects.get(username=username)
        user.set_password(pw)
        user.save()

        return JsonResponse({"updated":"True"})

@login_required
def logoutView(request):
    logout(request)
    return redirect('/')

@unauthenticated
def getUsernameView(request):
    if request.method == "POST":
        username = request.POST['username']
        print(username)
        un = User.objects.filter(username=username)
        if un:
            return JsonResponse({"exist":"True"})
        else:
            return JsonResponse({"exist":"False"})

@login_required
def followView(request):
    if request.method == "POST":
        user_id = request.POST['user_id']
        follow_user = User.objects.get(id=user_id)
        
        print('follow_user')
        print(follow_user)

        f = Following.objects.filter(user=request.user, followed=follow_user)
        fr = Followers.objects.filter(user=follow_user, follower=request.user)

        if f and fr:
            pass
        else:
            print("fx")
            Following.objects.create(user=request.user, followed=follow_user)
            Followers.objects.create(user=follow_user, follower=request.user)

            notification = Notification.objects.filter(user=follow_user, f=request.user)
            if notification:
                notification = Notification.objects.get(user=follow_user, f=request.user)
                notification.delete()
            Notification.objects.create(user=follow_user, f=request.user)

            return JsonResponse({'followed':'True'})
        return JsonResponse({'followed':'False'})

@login_required
def unfollowView(request):
    if request.method == "POST":
        user_id = request.POST.get('user_id')
        unfollow_user = User.objects.get(id=user_id)
        
        print('unfollow_user')
        print(unfollow_user)

        f=Following.objects.filter(user=request.user, followed=unfollow_user)
        fr=Followers.objects.filter(user=unfollow_user, follower=request.user)    

        if f and fr:
            print("f")
            f.delete()
            fr.delete()
            return JsonResponse({'unfollowed':'True'})
        return JsonResponse({'unfollowed':'False'})