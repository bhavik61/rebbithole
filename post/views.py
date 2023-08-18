from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
import json

from django.contrib.auth.hashers import check_password
from django.contrib.auth import update_session_auth_hash

from datetime import datetime, timedelta
from django.db.models import Count, Q

import base64
from django.core.files.base import ContentFile
#from django.views.decorators.csrf import csrf_exempt
#custom decorators
from accounts.decorators import login_required

from accounts.models import User, Followers, Following
from message.models import Room, Notification
from .models import Rebbithole, Member, Moderator, Post, PostImage, Vote, Comment, PostRebbithole, Bookmark, Report, NotInterested, Block
from .forms import ProfileForm, PostForm, CommentForm, CreateRhForm
#from django.forms import inlineformset_factory
#not in use

@login_required
def homeView(request):
    """rebbithole = Rebbithole.objects.get(rebbithole=rh)    
    #rposts = PostRebbithole.objects.filter(rebbithole=rebbithole) 
    posts = Post.objects.filter(postrebbithole__rebbithole=rebbithole)
    posts > rebithole joined
            post -> postrebbithole <- rebbithole -> member
          > user follow
            post -, author -> following, follower
    posts = Post.objects.filter(Q(title__icontains=res) | Q(text__icontains=res))
    posts = Post.objects.annotate(Count('bookmark')).filter(author=request.user)
    comments = Comment.objects.annotate(Count('bookmark')).filter(author=request.user)
    joined = Member.objects.filter(member=request.user)[::-1]
    #posts = Post.objects.all().exclude(author=request.user).order_by("-created")
    #rh_posts = Q(Count('postrebbithole')).annotate((Count('rebbithole')).filter(rebbithole=request.user))
    #posts = Post.objects.annotate(m=Count('member', filter="member__member")).filter(Count())
    bookmarks = Bookmark.objects.filter(user=request.user)[::-1]
    bms=[]
    for bm in bookmarks:
        bms.append(bm.post)
    users = User.objects.filter(is_user=True).exclude(username=request.user.username)
    for f in following:
        if f.followed in users:
            users = users.exclude(username=f.followed.username)
    """
    # = Followers.objects.filter(user=request.user)
    following = Following.objects.filter(user=request.user)
    joined = Member.objects.filter(member=request.user)

    posts = Post.objects.filter( Q(author__in=following.values_list('followed')) | Q(postrebbithole__rebbithole__in=joined.values_list('rebbithole')) ).exclude(author=request.user).order_by("-created").distinct()
    
    top_rh = Rebbithole.objects.filter(postrebbithole__created__gt=datetime.now() - timedelta(hours=24)).distinct()
    post_form = PostForm()
    context = {
        #'users' : users,
        #'following' : following,
        #'followers' : followers,
        'post_form' : post_form,
        'posts' : posts,
        'home' : 'nav-item-active',
        "top_rh" : top_rh
        #'bookmarks' : bms
    }

    return render(request, 'post/timeline.html', context)

@login_required
def profileView(request):
    profile_form = ProfileForm()
    post_form = PostForm()

    '''posts = Post.objects.filter(author=request.user)[::-1]
    comments = Comment.objects.filter(author=request.user)[::-1]
    following = Following.objects.filter(user=request.user)[::-1]
    followers = Followers.objects.filter(user=request.user)[::-1]
    fing_list = []
    for f in following:
        fing_list.append(f.followed)'''

    context = {
        'profile_form' : profile_form,
        'post_form' : post_form,

        #'posts' : posts,
        #'comments' : comments,
        #'following' : following,
        #'followers' : followers,
        #'fing_list' : fing_list,
        'profile' : 'nav-item-active',
    }
    return render(request, 'post/profile.html', context)

@login_required
def updateProfileView(request):
    if request.method == "POST":
        profile_form = ProfileForm(request.POST, request.FILES, instance=request.user)
        if profile_form.is_valid():
            profile_form.save()

            profile_name = request.user.name
            profile_url = request.user.url
            profile_bio = request.user.bio
            profile_image = request.user.avatar.url

            context = {
                 'profile_name' : profile_name,
                 'profile_url' : profile_url,
                 'profile_bio' : profile_bio, 
                 'profile_image' : profile_image
            }
            return JsonResponse(context)
    return JsonResponse({"profile":"nope"})

@login_required
def userProfileView(request, username):
    user = User.objects.get(username=username)
    if user.username == request.user.username:
        return redirect("/profile/")

    post_form = PostForm()
    '''posts = Post.objects.filter(author=user)[::-1]
    comments = Comment.objects.filter(author=user)[::-1]
    following = Following.objects.filter(user=request.user)
    wing_list = []
    for f in following:
        wing_list.append(f.followed)'''
    '''
    bookmarks = Bookmark.objects.filter(user=request.user)[::-1]
    bms=[]
    for bm in bookmarks:
        bms.append(bm.post)'''
    context = {
        "user" : user,
        #'posts' : posts,
        #'bookmarks' : bms,
        #'comments' : comments,
        #'wing_list' : wing_list,
        'post_form' : post_form,
        'reply' : 0,
    }
    return render(request, 'post/user-profile.html', context)

@login_required
def rebbitholeView(request, rh):
    post_form = PostForm()
    rebbithole = Rebbithole.objects.get(rebbithole=rh)    

    #rposts = PostRebbithole.objects.filter(rebbithole=rebbithole) 
    posts = Post.objects.filter(postrebbithole__rebbithole=rebbithole)
    '''for p in posts:
        print(p)
    member = Member.objects.filter(member=request.user)
    joined = []
    for m in member:
        joined.append(m.rebbithole)
    bookmarks = Bookmark.objects.filter(user=request.user)[::-1]
    bms=[]
    for bm in bookmarks:
        bms.append(bm.post)'''
    context = {
        "rebbithole" : rebbithole,
        #"rposts" : rposts,
        "posts" : posts,
        #'bookmarks' : bms,
        #"joined" : joined,
        'post_form' : post_form,
    }
    return render(request, 'post/rebbithole.html', context)

@login_required
def postViewView(request, post_id):
    post = Post.objects.get(id=post_id)
    #bookmarks = Bookmark.objects.filter(user=request.user)
    #comments = Comment.objects.filter(post=post).order_by("-vote_count")

    comment_form = CommentForm()
    post_form = PostForm()
    """
    bookmarks = Bookmark.objects.filter(user=request.user)
    bms=[]
    for bm in bookmarks:
        bms.append(bm.post)"""
    context = {
        'post' : post,
        #'comments' : comments,
        'comment_form' : comment_form,
        'post_form' : post_form,
        'reply' : 1,
    }
    return render(request, 'post/post-view.html', context)
'''
def replyViewInPostView(request):
    if request.method == "POST":
        comment_id = request.POST['comment_id']

        comment = Comment.objects.get(id = comment_id)

        def get_linemanagers(comment):
            if self.line_manager is None:
                return CustomUser.objects.none()
            return CustomUser.objects.filter(pk=self.line_manager.pk) | self.line_manager. get_linemanagers()

        comment_form = CommentForm()
        post_form = PostForm()
        context = {
            'post' : post,
            'comment_form' : comment_form,
            'post_form' : post_form,
            'reply' : 1,
        }
        return JsonResponse({"ok":"ok"})
    return render(request, 'post/post-view.html', context)
'''

@login_required
def bookmarksView(request):
    '''posts = Post.objects.annotate(Count('bookmark')).filter(author=request.user)
    comments = Comment.objects.annotate(Count('bookmark')).filter(author=request.user)'''

    posts = Post.objects.filter(bookmark__user=request.user)
    comments = Comment.objects.filter(bookmark__user=request.user)
    '''for p in posts:
        print(p)
    bookmarks = Bookmark.objects.filter(user=request.user)[::-1]
    bms=[]
    for bm in bookmarks:
        bms.append(bm.post)'''
    post_form = PostForm()
    top_rh = Rebbithole.objects.filter(postrebbithole__created__gt=datetime.now() - timedelta(hours=24)).distinct()
    context={
        'posts' : posts,
        'comments' : comments,
        #'bookmarks' : bms,
        'post_form' : post_form,
        'bm' : 'nav-item-active',
        'top_rh' : top_rh,
    }
    return render(request, 'post/bookmarks.html', context)

@login_required
def bookmarkView(request):
    if request.method == "POST":
        bookmark = request.POST["bookmark"]

        if bookmark == "post":
            post_id = request.POST['post_id']
            post = Post.objects.get(id=post_id)
            post_bookmark = Bookmark.objects.filter(post = post, user = request.user)

            if post_bookmark:
                post_bookmark = Bookmark.objects.get(post = post, user = request.user)
                post_bookmark.delete()
                return JsonResponse({"bookmark":"False"})
            else:
                Bookmark.objects.create(post=post, user=request.user)
                return JsonResponse({"bookmark":"True"})

        elif bookmark == "comment":
            comment_id = request.POST['comment_id']
            comment = Comment.objects.get(id=comment_id)
            comment_bookmark = Bookmark.objects.filter(comment = comment, user = request.user)

            if comment_bookmark:
                comment_bookmark = Bookmark.objects.get(comment = comment, user = request.user)
                comment_bookmark.delete()
                return JsonResponse({"bookmark":"False"})
            else:
                Bookmark.objects.create(comment = comment, user = request.user)
                return JsonResponse({"bookmark":"True"})
        return JsonResponse({"okay":"okay"})

@login_required
def rebbitholeNavView(request):
    post_form = PostForm()
    create_rh_form = CreateRhForm()
    #joined = Member.objects.filter(member=request.user)[::-1]
    '''for j in joined:
        print(j.rebbithole)'''

    #moderator = Moderator.objects.filter(moderator=request.user)[::-1]
    '''print("---------")
    for m in moderator:
        print(m)'''

    top_rh = Rebbithole.objects.filter(postrebbithole__created__gt=datetime.now() - timedelta(hours=24)).distinct()
    context = {
        #"joined" : joined,
        #"moderator" : moderator,
        "create_rh_form" : create_rh_form,
        "post_form" : post_form,
        'rh' : 'nav-item-active',
        'rhi' : 'item-icon-rh-active',
        'top_rh' : top_rh,
    }
    return render(request, 'post/rebbithole-nav.html', context)

@login_required
def createRHView(request):
    if request.method == "POST":
        rh = Rebbithole.objects.filter(rebbithole__icontains=request.POST['rh'])
        if rh:
            return JsonResponse({"rh":"exists"})
        else:
            create_rh_form = CreateRhForm(request.POST, request.FILES)
            if create_rh_form.is_valid():
                rh = create_rh_form.save()
                print('rh')
                print(rh)
                Member.objects.create(rebbithole=rh, member=request.user)
                Moderator.objects.create(rebbithole=rh, moderator=request.user)
                Room.objects.create(rebbithole=rh, room=rh.rebbithole)

                context = {
                    "okay" : "okay",
                    "id" : rh.id,
                    "avatar" : rh.avatar.url,
                }
                return JsonResponse(context)

@login_required
def joinRebbitholeView(request):
    if request.method == "POST":
        rebbithole_id = request.POST['rebbithole_id']
        rebbithole = Rebbithole.objects.get(id=rebbithole_id)

        # error message, if rh: cant unjoin rebbithole
        #rh = Rebbithole.objects.annotate(Count('moderator')).get(id=rebbithole_id)
        '''print("r")
        print(rh)'''

        member = Member.objects.filter(rebbithole=rebbithole, member=request.user)

        if member:
            member = Member.objects.get(rebbithole=rebbithole, member=request.user)
            member.delete()
            return JsonResponse({"joined":"False"})
        else:
            Member.objects.create(rebbithole=rebbithole, member=request.user)
            return JsonResponse({"joined":"True"})
        return JsonResponse({"joined":"what"})

@login_required
def discoverView(request):
    post_form = PostForm()

    top_time = datetime.now() - timedelta(hours=24)
    hot_time = datetime.now() - timedelta(hours=3)

    top_posts = Post.objects.filter(created__gt=top_time).order_by("-vote_count")
    hot_posts = Post.objects.filter(created__gt=hot_time).order_by("-vote_count")

    top_rh = Rebbithole.objects.filter(postrebbithole__created__gt=top_time).distinct()

    context = {
        "post_form" : post_form,
        "top_posts" : top_posts,
        "hot_posts" : hot_posts,
        "top_rh" : top_rh,
        'dis' : 'nav-item-active',
        "username" : request.user.username,
    }
    return render(request, "post/discover.html", context)

@login_required
def discoverResultsView(request, res):
    post_form = PostForm()
    
    rhs = Rebbithole.objects.filter(rebbithole__icontains=res)
    profiles = User.objects.filter(username__icontains=res).exclude(username=request.user.username)
    posts = Post.objects.filter(Q(title__icontains=res) | Q(text__icontains=res))

    '''following = Following.objects.filter(user=request.user)
    fing_list = []
    for f in following:
        fing_list.append(f.followed)
    joined = Member.objects.filter(member=request.user)'''

    top_rh = Rebbithole.objects.filter(postrebbithole__created__gt=datetime.now() - timedelta(hours=24)).distinct()
    context = {
        "rebbitholes" : rhs,
        "profiles" : profiles,
        "posts" : posts,
        #"fing_list" : fing_list,
        #"joined" : joined,
        "post_form" : post_form,
        "top_rh" : top_rh,
        "res" : res,
        "username" : request.user.username,
        'dis' : 'nav-item-active',
    }
    return render(request, "post/discover-results.html", context)

# RH results for post and discover
@login_required
def getRebbitholeView(request):
    if "term" in request.GET:
        search = request.GET["term"]
        '''print('search')
        print(search)'''
        if(search[0:2]=="r/" and len(search)>3):
            search = search[2:]
            #print(search)
            rebbitholes_qs = Rebbithole.objects.filter(rebbithole__startswith=search)
            rebbitholes = ["r/"+rh.rebbithole for rh in rebbitholes_qs]
            return JsonResponse(rebbitholes, safe=False)

        #rebbitholes_qs = Rebbithole.objects.filter(rebbithole__icontains=request.GET.get('term'))
        rebbitholes_qs = Rebbithole.objects.filter(rebbithole__startswith=search)
        rebbitholes = ["r/"+rh.rebbithole for rh in rebbitholes_qs]

        '''print(rebbitholes)
        print(type(rebbitholes))'''
        return JsonResponse(rebbitholes, safe=False)

# User results for discover
@login_required
def getUserView(request):
    if "term" in request.GET:
        search = request.GET["term"]
        search = search[2:]
        '''print('search')
        print(search)'''

        #rebbitholes_qs = Rebbithole.objects.filter(rebbithole__icontains=request.GET.get('term'))
        user_qs = User.objects.filter(username__startswith=search)
        #print(user_qs)
        user = ["u/"+user.username for user in user_qs]
        #print(user)
        return JsonResponse(user, safe=False)

@login_required
def createPostView(request):
    print('0')

    if request.method == 'POST':
        post_form = PostForm(request.POST, request.FILES)
        print('1')

        if post_form.is_valid():
            print('2')
            
            rh1 = request.POST['rh1']
            rh2 = request.POST['rh2']
            rh3 = request.POST['rh3']
            rhlist = [rh1, rh2, rh3]

            rhs = [rh for rh in rhlist if rh != "undefined"]
            '''print('rhs')
            print(len(rhs))
            print(rhs)'''

            imageb64str1 = request.POST['img1']
            imageb64str2 = request.POST['img2']
            imageb64str3 = request.POST['img3']
            imageb64str4 = request.POST['img4']
            imageb64strlist = [imageb64str1, imageb64str2, imageb64str3, imageb64str4]

            imageb64 = [b64str for b64str in imageb64strlist if b64str != "undefined"]          
            '''print('len(imageb64)')
            print(len(imageb64))'''

            new_post = post_form.save(commit=False)
            new_post.author = request.user
            new_post.save()

            Vote.objects.create(post=new_post, voter=request.user, upvote=True, downvote=False)

            new_post_rh_count = 0
            new_post_rh_id = 0
            rh_avatar = []
            
            for rh in rhs:
                rebbithole = Rebbithole.objects.get(rebbithole=rh[2:])
                '''print('rebbithole')
                print(rebbithole)'''
                new_post_rh = PostRebbithole.objects.create(post = new_post, rebbithole = rebbithole)
                new_post_rh_count = new_post_rh_count + 1
                new_post_rh_id = new_post_rh.id

                r = Rebbithole.objects.get(rebbithole=rh[2:])
                rh_avatar.append(r.avatar.url)

            new_post_rh_id = new_post_rh_id - new_post_rh_count

            def base64ToImage(data, name=None):
                #print('b64')
                _format, _img_str = data.split(';base64,')
                _name, ext = _format.split('/')
                if not name:
                    #name = _name.split(":")[-1]
                    name = "image/"+str(new_post.id)
                return ContentFile(base64.b64decode(_img_str), name='{}.{}'.format(name, ext))
            
            new_post_image_count = 0
            new_post_image_id = 0
            for b64str in imageb64:
                new_post_image = PostImage.objects.create(post = new_post, image = base64ToImage(b64str))
                new_post_image_count = new_post_image_count + 1
                new_post_image_id = new_post_image.id
 
            new_post_image_id = new_post_image_id - new_post_image_count
            
            context = {
                'avatar_url' : request.user.avatar.url,
                'username' : request.user.username,
                'post_id' : new_post.id,
                'rhs' : rhs,
                'rh_id' : new_post_rh_id,
                'rh_avatar' : rh_avatar,
                'post_title' : new_post.title,
                'post_text' : new_post.text,
                'post_images' : imageb64,
                'post_image_id' : new_post_image_id,
            }
            return JsonResponse(context)
        return JsonResponse({"data":"okay"})

#not used
def loadCommentsView(request):
    if request.method == "POST":
        post_id = request.POST['post_id']
        print(post_id)
        post = Post.objects.get(id=post_id)
        comments = Comment.objects.filter(post=post)

        context = {
            "comments" : 'comments',
        }
        return JsonResponse(context)

@login_required
def voteView(request):
    if request.method == "POST":
        post_id = request.POST['post_id']
        vote_type = request.POST['vote_type']

        post = Post.objects.get(id=post_id)
        post_vote = Vote.objects.filter(post=post, voter=request.user)
        '''for v in post_vote:
            post_vote = v
            print('==========')
            print(post_vote.upvote)
            print(post_vote.downvote)
        print('post.vote_count')
        print(post.vote_count)'''

        if post_vote:
            post_vote = Vote.objects.get(post = post, voter = request.user)
            
            print("update")
            if vote_type == "upvote":
                if post_vote.upvote == True:
                    print("1")
                    post.vote_count = post.vote_count - 1
                    post.save()

                    user = User.objects.get(username=post.author.username)
                    user.karma = user.karma - 1
                    user.save()

                    post_vote.upvote = False
                    post_vote.save()
                    return JsonResponse({"upvote":"False"})
                else:
                    print("2")

                    post.vote_count = post.vote_count + 1
                    post.save()

                    user = User.objects.get(username=post.author.username)
                    user.karma = user.karma + 1
                    user.save()

                    # NOTIFICATION
                    if post_vote.voter != post.author:
                        notification = Notification.objects.filter(v_p=post)
                        if notification:
                            notification = Notification.objects.get(v_p=post)
                            notification.delete()
                        Notification.objects.create(user=post.author, v_p=post)

                    if post_vote.downvote == True:
                        print("3")
                        post.vote_count = post.vote_count + 1
                        post.save()
                        
                        post_vote.upvote = True
                        post_vote.downvote = False
                        post_vote.save()

                        return JsonResponse({"upvote":"TrueF"})

                    post_vote.upvote = True
                    post_vote.save()
                    return JsonResponse({"upvote":"True"})

            if vote_type == "downvote":
                if post_vote.downvote == True:
                    post.vote_count = post.vote_count + 1
                    post.save()
                    
                    user = User.objects.get(username=post.author.username)
                    user.karma = user.karma + 1
                    user.save()

                    print("1")
                    post_vote.downvote = False
                    post_vote.save()
                    return JsonResponse({"downvote":"False"})
                else:
                    post.vote_count = post.vote_count - 1
                    post.save()

                    user = User.objects.get(username=post.author.username)
                    user.karma = user.karma - 1
                    user.save()

                    print("2")
                    if post_vote.upvote == True:
                        print("3")
                        post.vote_count = post.vote_count - 1
                        post.save()

                        post_vote.downvote = True
                        post_vote.upvote = False
                        post_vote.save()
                        return JsonResponse({"downvote":"TrueF"})
                    post_vote.downvote = True
                    post_vote.save()
                    return JsonResponse({"downvote":"True"})
        else:
            print("create")
            if vote_type == "upvote":
                post.vote_count = post.vote_count + 1
                post.save()
                
                user = User.objects.get(username=post.author.username)
                user.karma = user.karma + 1
                user.save()

                post_vote = Vote.objects.create(post=post, voter=request.user, upvote=True, downvote=False)
                
                # NOTIFICATION
                if post_vote.voter != post.author:
                    notification = Notification.objects.filter(v_p=post)
                    if notification:
                        notification = Notification.objects.get(v_p=post)
                        notification.delete()
                    Notification.objects.create(user=post.author, v_p=post)

                return JsonResponse({"upvote":"True"})

            elif vote_type == "downvote":
                post.vote_count = post.vote_count - 1
                post.save()
                
                user = User.objects.get(username=post.author.username)
                user.karma = user.karma - 1
                user.save()

                Vote.objects.create(post=post, voter=request.user, upvote=False, downvote=True) 
                return JsonResponse({"downvote":"True"})

        return JsonResponse({"okay":"okay"})

@login_required
def voteCommentView(request):
    if request.method == "POST":
        comment_id = request.POST['comment_id']
        vote_type = request.POST['vote_type']
        
        comment = Comment.objects.get(id=comment_id)
        comment_vote = Vote.objects.filter(comment = comment, voter = request.user)
        '''for v in comment_vote:
            comment_vote = v
            print(comment_vote.upvote)
            print(comment_vote.downvote)
        comment.vote_count=0
        comment.save()
        print('comment.vote_count')
        print(comment.vote_count)'''

        if comment_vote:
            comment_vote = Vote.objects.get(comment = comment, voter = request.user)
            
            print("update")
            if vote_type == "upvote":
                if comment_vote.upvote == True:
                    comment.vote_count = comment.vote_count - 1
                    comment.save()

                    user = User.objects.get(username=comment.author.username)
                    user.karma = user.karma - 1
                    user.save()

                    print("1")
                    comment_vote.upvote = False
                    comment_vote.save()
                    return JsonResponse({"upvote":"False"})
                elif comment_vote.upvote == False:
                    comment.vote_count = comment.vote_count + 1
                    comment.save()

                    user = User.objects.get(username=comment.author.username)
                    user.karma = user.karma + 1
                    user.save()

                    # NOTIFICATION
                    if comment_vote.voter != comment.author:
                        notification = Notification.objects.filter(v_c=comment)
                        if notification:
                            notification = Notification.objects.get(v_c=comment)
                            notification.delete()
                        Notification.objects.create(user=comment.author, v_c=comment)

                    print("2")
                    if comment_vote.downvote == True:
                        print("3")
                        comment.vote_count = comment.vote_count + 1
                        comment.save()

                        user = User.objects.get(username=comment.author.username)
                        user.karma = user.karma + 1
                        user.save()

                        comment_vote.upvote = True
                        comment_vote.downvote = False
                        comment_vote.save()
                        return JsonResponse({"upvote":"TrueF"})

                    comment_vote.upvote = True
                    comment_vote.save()
                    return JsonResponse({"upvote":"True"})

            if vote_type == "downvote":
                if comment_vote.downvote == True:
                    comment.vote_count = comment.vote_count + 1
                    comment.save()

                    user = User.objects.get(username=comment.author.username)
                    user.karma = user.karma + 1
                    user.save()

                    print("1")
                    comment_vote.downvote = False
                    comment_vote.save()
                    return JsonResponse({"downvote":"False"})
                elif comment_vote.downvote == False:
                    comment.vote_count = comment.vote_count - 1
                    comment.save()

                    user = User.objects.get(username=comment.author.username)
                    user.karma = user.karma - 1
                    user.save()

                    print("2")
                    if comment_vote.upvote == True:
                        print("3")
                        comment.vote_count = comment.vote_count - 1
                        comment.save()

                        user = User.objects.get(username=comment.author.username)
                        user.karma = user.karma - 1
                        user.save()

                        comment_vote.downvote = True
                        comment_vote.upvote = False
                        comment_vote.save()
                        return JsonResponse({"downvote":"TrueF"})
                    comment_vote.downvote = True
                    comment_vote.save()
                    return JsonResponse({"downvote":"True"})
        else:
            print("create")
            if vote_type == "upvote":
                comment.vote_count = comment.vote_count + 1
                comment.save()

                user = User.objects.get(username=comment.author.username)
                user.karma = user.karma + 1
                user.save()

                comment_vote = Vote.objects.create(comment=comment, voter=request.user, upvote=True, downvote=False) 
                
                # NOTIFICATION
                if comment_vote.voter != comment.author:
                    notification = Notification.objects.filter(v_c=comment)
                    if notification:
                        notification = Notification.objects.get(v_c=comment)
                        notification.delete()
                    Notification.objects.create(user=comment.author, v_c=comment)

                return JsonResponse({"upvote":"True"})

            elif vote_type == "downvote":
                comment.vote_count = comment.vote_count - 1
                comment.save()

                user = User.objects.get(username=comment.author.username)
                user.karma = user.karma - 1
                user.save()

                Vote.objects.create(comment=comment, voter=request.user, upvote=False, downvote=True) 
                return JsonResponse({"downvote":"True"})

        return JsonResponse({"okay":"okay"})

@login_required
def submitCommentView(request):
    if request.method == "POST":
        comment_form = CommentForm(request.POST)

        if comment_form.is_valid:
            comment_id = request.POST['comment_id']
            post_id = request.POST['post_id']
            post = Post.objects.get(id=post_id)
        
            # COMMENT TO POST
            if comment_id == "none":
                new_comment = comment_form.save(commit=False)
                
                new_comment.post = post
                new_comment.author = request.user
                new_comment.save()
    
                Vote.objects.create(comment=new_comment, voter=request.user, upvote=True, downvote=False)

                # NOTIFICATION
                if new_comment.author != post.author:
                    Notification.objects.create(user=post.author, c=new_comment)

                context = {
                    'avatar_url' : request.user.avatar.url,
                    'username' : request.user.username,
                    'comment_text' : new_comment.text,
                    'comment_id' : new_comment.id,
                }
                return JsonResponse(context)
            # REPLY TO COMMENT
            else:
                comment = Comment.objects.get(id=comment_id)
                new_comment = comment_form.save(commit=False)

                new_comment.post = post
                new_comment.reply = comment
                new_comment.author = request.user
                new_comment.save()

                Vote.objects.create(comment=new_comment, voter=request.user, upvote=True, downvote=False)
                # NOTIFICATION
                if new_comment.author != comment.author:
                    n = Notification.objects.create(user=comment.author, r=new_comment)

                context = {
                    'avatar_url' : request.user.avatar.url,
                    'username' : request.user.username,
                    'comment_text' : new_comment.text,
                    'comment_id' : new_comment.id,
                }
                return JsonResponse(context)

@login_required
def viewInpostView(request, post_id, comment_id):
    post = Post.objects.get(id=post_id)

    comment_form = CommentForm()
    post_form = PostForm()
    
    context = {
        'post' : post,
        'comment_id' : comment_id,
        'comment_form' : comment_form,
        'post_form' : post_form,
        'reply' : 1,
    }
    return render(request, 'post/post-view.html', context)

@login_required
def deleteCommentView(request):
    if request.method == "POST":
        comment_id = request.POST["comment_id"]
        comment = Comment.objects.get(id = comment_id)
        comment.delete()
        return JsonResponse({"comment":"deleted"})

@login_required
def reportView(request):
    if request.method == "POST":
        report = request.POST['report']

        if report == "post":
            post_id = request.POST['post_id']
            post = Post.objects.get(id=post_id)
            report = Report.objects.filter(post=post, reported_by=request.user)

            if not report:
                Report.objects.create(post=post, reported_by=request.user)
            return JsonResponse({"report":"reported"})

        elif report == "comment":
            comment_id = request.POST['comment_id']
            comment = Comment.objects.get(id=comment_id)
            report = Report.objects.filter(comment=comment, reported_by=request.user)

            if not report:
                Report.objects.create(comment=comment, reported_by=request.user)
            return JsonResponse({"report":"reported"})

        elif report == "account":
            user_id = request.POST['user_id']
            user = User.objects.get(id=user_id)
            report = Report.objects.filter(user=user, reported_by=request.user)

            if not report:
                Report.objects.create(user=user, reported_by=request.user)

            return JsonResponse({"report":"reported"})
        elif report == "rebbithole":
            rebbithole_id = request.POST["rebbithole_id"]
            rebbithole = Rebbithole.objects.get(id=rebbithole_id)
            report = Report.objects.filter(rebbithole=rebbithole, reported_by=request.user)

            if not report:
                Report.objects.create(rebbithole=rebbithole, reported_by=request.user)

            return JsonResponse({"report":"reported"})

@login_required
def notInterestedView(request):
    if request.method == "POST":
        post_id = request.POST['post_id']

        post = Post.objects.get(id=post_id)
        not_interested = NotInterested.objects.filter(post=post, user=request.user)

        if not not_interested:
            NotInterested.objects.create(post=post, user=request.user)
        return JsonResponse({"interested":"not"})

@login_required
def blockView(request):
    if request.method == "POST":
        user_id = request.POST['user_id']

        user = User.objects.get(id=user_id)
        block = Block.objects.filter(user=user, blocked_by=request.user)

        if not block:
            Block.objects.create(user=user, blocked_by=request.user)
        return JsonResponse({"blocked":"yes"})

@login_required
def deletePostView(request):
    if request.method == "POST":
        post_id = request.POST["post_id"]
        post = Post.objects.get(id = post_id)
        post.delete()

        return JsonResponse({"post":"deleted"})

@login_required
def changePwView(request):
    if request.method == "POST":
        pwc = request.POST["pwc"]
        pw = request.POST["pw"]

        user = User.objects.get(username=request.user.username)

        if check_password(pwc, user.password):
            print("t")
            user.set_password(pw)
            user.save()
            update_session_auth_hash(request, user)
            return JsonResponse({"pw":"changed"})
        else:
            print("f")
            return JsonResponse({"pw":"wrong"})
        return JsonResponse({"ok":"ok"})

@login_required
def deleteAccountView(request):
    user = User.objects.get(username=request.user.username)
    #user.delete()
    return render(request, 'post/deleted.html')