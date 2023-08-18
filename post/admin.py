from django.contrib import admin

from .models import Post, PostImage, Vote, Comment, PostRebbithole, Member, Rebbithole, Moderator, Bookmark, Report, NotInterested, Block

admin.site.register(Post)
admin.site.register(PostImage)
admin.site.register(Vote)
admin.site.register(Comment)
admin.site.register(PostRebbithole)

admin.site.register(Rebbithole)
admin.site.register(Member)
admin.site.register(Moderator)

admin.site.register(Bookmark)
admin.site.register(Report)
admin.site.register(NotInterested)
admin.site.register(Block)

