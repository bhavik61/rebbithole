from django.db import models
from django.contrib.auth.models import AbstractUser

from django.utils import timezone

class User(AbstractUser):
    is_user = models.BooleanField(default=False)
    is_moderator = models.BooleanField(default=False)

    name = models.CharField(max_length=50, null=True, blank=True)
    avatar = models.ImageField(upload_to="avatar/", default="avatar/avatar.jpeg", null=True, blank=True)
    bio = models.TextField(max_length=150, null=True, blank=True)
    url = models.URLField(max_length=100 ,null=True, blank=True)

    karma = models.IntegerField(default=1)

    is_email_verified = models.BooleanField(default=False)
    is_account_protected = models.BooleanField(default=False)
    is_account_verified = models.BooleanField(default=False)
    is_account_witheld = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(editable=False)
    updated_at = models.DateTimeField()

    def save(self, *args, **kwargs):
        if not self.id:
            self.created_at = timezone.now()
        self.updated_at = timezone.now()
        return super(User, self).save(*args, **kwargs)

    def __str__(self):
        return self.username or ''

class Following(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,)
    followed = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followed", blank=True, null=True)
    
    def __str__(self):
        return str(self.user) + "->" + str(self.followed) or ''

class Followers(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,)
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name="follower", blank=True, null=True)

    def __str__(self):
        return str(self.user) + "->" + str(self.follower) or ''