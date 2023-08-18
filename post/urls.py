from django.urls import path

from .views import *

urlpatterns = [
    path('', homeView, name="home-timeline"),
    path('bookmarks/', bookmarksView, name="bookmarks"),
    path('rebbithole-nav/', rebbitholeNavView, name="rebbithole-nav"),
    path('discover/', discoverView, name="discover"),
    #path('home/', homeView, name="home"),
    path('profile/', profileView, name="profile"),
    path('update-profile/', updateProfileView, name="update-profile"),

    path('rebbithole/<str:rh>/', rebbitholeView, name="rebbithole"),
    path('join-rebbithole/', joinRebbitholeView, name="join-rebbithole"),
    path('create-rh/', createRHView, name="create-rh"),

    path('profile/<str:username>/', userProfileView, name="user-profile"),
    path('post/<int:post_id>', postViewView, name="post-view"),
    path('post/<int:post_id>/<int:comment_id>', viewInpostView, name="view-in-post"),

    path('get-rebbithole/', getRebbitholeView, name="get-rebbithole"), # in post adding rebbithole
    path('get-user/', getUserView, name="get-user"),
    path('discover-results/<str:res>/', discoverResultsView, name="discover-results"),
    #path('discover-results/', discoverResultsView, name="discover-results"),

    path('create-post/', createPostView, name="create-post"),
    path('write-post/', homeView, name="write-post"), #Modal
    path('delete-post/', deletePostView, name="delete-post"),

    path('submit-comment/', submitCommentView, name="submit-comment"),
    path('delete-comment/', deleteCommentView, name="delete-comment"),
    #path('repy-view-in-post', replyViewInPostView, name="repy-view-in-post"),

    path('bookmark/', bookmarkView, name="bookmark"),
    path('vote/', voteView, name="vote"),
    path('vote-comment/', voteCommentView, name="vote-comment"),
    
    path('report/', reportView, name="report"),
    path('not-interested/', notInterestedView, name="not-interested"),
    path('block/', blockView, name="block"),

    path('change-pw/', changePwView, name="change-pw"),

    path('account-has-been-deleted/', deleteAccountView, name="account-has-been-deleted"),

    path('load-comments/', loadCommentsView, name="load-comments"),
]