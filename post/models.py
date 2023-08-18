from django.db import models
from django.utils import timezone

from accounts.models import User

class Rebbithole(models.Model):
    rebbithole = models.CharField(max_length=25, unique=True)
    topic = models.CharField(max_length=25)
    description = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to="rebbilehole/", default="avatar/rh_a.jpg")

    nsfw = models.BooleanField(default=False)

    created = models.DateTimeField(editable=False)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        return super(Rebbithole, self).save(*args, **kwargs)

    def __str__(self):
        return self.rebbithole or ''

class Member(models.Model):
    rebbithole = models.ForeignKey(Rebbithole, on_delete=models.CASCADE)
    member = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.member) +" -> "+ str(self.rebbithole) or ''

class Moderator(models.Model):
    rebbithole = models.ForeignKey(Rebbithole, on_delete=models.CASCADE)
    moderator = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.moderator) +" -> "+ str(self.rebbithole) or ''

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    title = models.CharField(max_length=300)
    text = models.CharField(max_length=3000, blank=True)

    flair = models.CharField(max_length=30, blank=True) #maybe don't add

    vote_count = models.IntegerField(default=1, blank=True)

    is_draft = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False) #maybe don't add

    created = models.DateTimeField(editable=False, blank=True)
    updated = models.DateTimeField(blank=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        self.updated = timezone.now()
        return super(Post, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.id) +" > "+ str(self.author)  or ''

class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="posts/")

    def __str__(self):
        return str(self.id) +" -> "+ str(self.post.id) or ''

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True, null=True)
    reply = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)

    text = models.CharField(max_length=1500)

    vote_count = models.IntegerField(default=1, blank=True)

    created = models.DateTimeField(editable=False, blank=True)
    updated = models.DateTimeField(blank=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        self.updated = timezone.now()
        return super(Comment, self).save(*args, **kwargs)

    def __str__(self):
        comment_to = ""
        if self.post:
            comment_to = "p: " + str(self.post.id)
        else:
            comment_to = "c: " + str(self.reply.id)
        return str(self.id) +" -> "+ comment_to or ''

class Vote(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True)
    voter = models.ForeignKey(User, on_delete=models.CASCADE)

    upvote = models.BooleanField(default=False)
    downvote = models.BooleanField(default=False)

    def __str__(self):
        vote_to = ""
        if self.post:
            vote_to = "p: " + str(self.post.id)
        else:
            vote_to = "c: " + str(self.comment.id)

        return str(self.voter) +" > "+str(self.upvote) +" , "+ str(self.downvote) +" -> "+ vote_to or ''

class PostRebbithole(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    rebbithole = models.ForeignKey(Rebbithole, on_delete=models.CASCADE)

    created = models.DateTimeField(editable=False)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        return super(PostRebbithole, self).save(*args, **kwargs)
    
    def __str__(self):
        return str(self.rebbithole) + " -> " + str(self.post.id) or ''

class Bookmark(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        bookmark_to = ""
        if self.post:
            bookmark_to = "p: " + str(self.post.id)
        else:
            bookmark_to = "c: " + str(self.comment.id)
        return bookmark_to + " -> " + str(self.user) or ''

class NotInterested(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.post) + " -> " + str(self.user) or ''

class Report(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    rebbithole = models.ForeignKey(Rebbithole, on_delete=models.CASCADE, null=True)

    reported_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="r_by")

    def __str__(self):
        report_to = ""
        if self.post:
            report_to = "p: " + str(self.post.id)
        elif self.comment:
            report_to = "c: " + str(self.comment.id)
        elif self.user:
            report_to = "u: " + str(self.user.id)
        else:
            report_to = "r: " + str(self.rebbithole.id)
        return report_to + " > " + str(self.reported_by) or ''

class Block(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    blocked_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="b_by")

    def __str__(self):
        return str(self.user.id) + " > " + str(self.blocked_by) or ''