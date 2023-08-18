from django.db import models
from django.utils import timezone

from post.models import Rebbithole, Comment, Post
from accounts.models import User

class Room(models.Model):
    rebbithole = models.OneToOneField(Rebbithole, on_delete=models.CASCADE)
    room = models.CharField(max_length=25)

    def __str__(self):
        return self.room or ''

class Message(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created = models.DateTimeField(editable=False, db_index=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        return super(Message, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.room) +" > "+ str(self.user) or ''

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    # COMMENT/REPLY
    c = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True, related_name="c")
    r = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True, related_name="r")
    # VOTE
    v_p = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, related_name="v_p")
    v_c = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True, related_name="v_c")
    # FOLLOWER
    f = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    created = models.DateTimeField(editable=False, db_index=True)
    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        return super(Notification, self).save(*args, **kwargs)

    def __str__(self):
        n_of = ""

        if self.v_p:
            n_of = "v p: " + str(self.v_p.id)
        elif self.v_c:
            n_of = "v c: " + str(self.v_c.id)
        elif self.c:
            n_of = "c: " + str(self.c.id)
        else:
            n_of = "r: " + str(self.r.id)
        
        return n_of or ''