from django.shortcuts import render, redirect
from post.models import Rebbithole, Member
from .models import Room, Message, Notification
from datetime import datetime, timedelta
from collections import OrderedDict

from accounts.decorators import login_required
from post.forms import PostForm

post_form = PostForm()

@login_required
def messageView(request):
    joined = Member.objects.filter(member = request.user)
    rooms = Room.objects.filter(rebbithole__in = joined.values_list('rebbithole'))
    last_messages = {}

    for room in rooms:
        if Message.objects.filter(room=room, user=request.user):
            last_message = Message.objects.filter(room=room).last()

            last_messages[room.room] = {}

            last_messages[room.room]['message'] = last_message.user.username +" : "+ last_message.message
            last_messages[room.room]['created'] = last_message.created
            last_messages[room.room]['avatar'] = room.rebbithole.avatar.url
       
    last_messages = OrderedDict(reversed(sorted(last_messages.items(), key=lambda i: i[1]['created'])))

    rebbitholes = Member.objects.filter(member = request.user)[::-1]

    context = {
        'post_form' : post_form,
        "last_messages" : last_messages,
        "rebbitholes" : rebbitholes,
        'mes' : 'nav-item-active',
    }
    return render(request, "message/message.html", context)

@login_required
def roomView(request, rh):
    member = Member.objects.filter(rebbithole__rebbithole=rh, member = request.user)
    if not member:
        return redirect("/")

    # RECENT / LAST MESSAGES
    joined = Member.objects.filter(member = request.user)
    rooms = Room.objects.filter(rebbithole__in = joined.values_list('rebbithole'))
    last_messages = {}

    for room in rooms:
        if Message.objects.filter(room=room, user=request.user):
            last_message = Message.objects.filter(room=room).last()

            last_messages[room.room] = {}

            last_messages[room.room]['message'] = last_message.user.username +" : "+ last_message.message
            last_messages[room.room]['created'] = last_message.created
            last_messages[room.room]['avatar'] = room.rebbithole.avatar.url
    last_messages = OrderedDict(reversed(sorted(last_messages.items(), key=lambda i: i[1]['created'])))

    rebbithole = Rebbithole.objects.get(rebbithole=rh)
    room = Room.objects.get(rebbithole=rebbithole)
    messages = Message.objects.filter(room=room)

    context = {
        'post_form' : post_form,
        "rebbithole" : rebbithole,
        'room' : room,
        'last_messages' : last_messages,
        'messages' : messages,
        'mes' : 'nav-item-active',
    }
    return render(request, "message/room.html", context)

@login_required
def notificationView(request):
    notifications = Notification.objects.filter(user=request.user)

    top_rh = Rebbithole.objects.filter(postrebbithole__created__gt=datetime.now() - timedelta(hours=24)).distinct()
    context = {
        'post_form' : post_form,
        "notifications" : notifications,
        'noti' : 'nav-item-active',
        "top_rh" : top_rh
    }
    return render(request, 'message/notification.html', context)