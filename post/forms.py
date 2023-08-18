from django import forms 
from django.db import transaction

from accounts.models import User
from .models import Post, Comment, Rebbithole

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'text']

        widgets = {
            'title' : forms.Textarea(attrs={
                'id' : 'title',
                'placeholder' : 'An interesting title',
                'type' : 'text',
                'required' : True,
                'autofocus' : True,
                'rows' : 1,
                #"onkeyup" : "manage(this)",
            }),
            'text' : forms.Textarea(attrs={
                'id' : 'text',
                'placeholder' : 'Text (optional)',
                'type' : 'text',
                'required' : False,
                'rows' : 9,
            }),
        }

'''    @transaction.atomic
    def save(self):
        post = super().save(commit=False)
        post.author = request.user
        post.save()
        return post'''

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['text']

        widgets = {
            'text' : forms.Textarea(attrs={
                'id' : 'comment-text',
                'class' : 'reply-text',
                'placeholder' : 'Write a comment',
                'required' : True,
                'autofocus' : True,
                'type' : 'text',
                'required' : False,
                'rows' : 1,
            }),
        }


class ProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['avatar', 'name', 'bio', 'url', ]

        widgets = {
            'avatar' : forms.FileInput(attrs={
                'id' : 'profile_avatar',
                'accept' : '.jpg',
                'accept' : '.jpeg',
                'accept' : '.png',
            }),
            'name' : forms.TextInput(attrs={
                'id' : 'profile_name',
                'placeholder' : 'Display name',
                'required' : True
            }),
            'bio' : forms.Textarea(attrs={
                'id' : 'profile_bio',
                'placeholder' : 'A little about yourself',
                'rows' : 5,
            }),
            'url' : forms.TextInput(attrs={
                'id' : 'profile_url',
                'placeholder' : 'An URL i.e.  www.yoursite.com',
            }),
        }

class CreateRhForm(forms.ModelForm):
    class Meta:
        model = Rebbithole
        fields = ['rebbithole', 'topic', 'description', 'avatar', ]

        widgets = {
            'rebbithole' : forms.TextInput(attrs={
                'id' : 'rh_name',
                'placeholder' : 'A unique name for rebbithole',
                'required' : True

            }),
            'topic' : forms.TextInput(attrs={
                'id' : 'rh_topic',
                'placeholder' : "What's the topic?",
                'required' : True
            }),
            'description' : forms.Textarea(attrs={
                'id' : 'rh_des',
                'placeholder' : 'A little about rebbithole',
                'rows' : 5,
                'required' : True

            }),
            'avatar' : forms.FileInput(attrs={
                'id' : 'rh_avatar',
                'accept' : '.jpg',
                'accept' : '.jpeg',
                'accept' : '.png',
            }),
        }