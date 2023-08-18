from django import forms
from django.db import transaction

from django.contrib.auth.forms import UserCreationForm

from .models import User

class RegisterUserForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):

        model = User
        fields = ['name', 'email', 'username', 'password1', 'password2']

        widgets = {
            'name' : forms.TextInput(attrs={
                'id' : 'name',
                'required' : True,
                'placeholder' : 'Name',
                'autofocus':True,
            }),
            'email' : forms.TextInput(attrs={
                'id' : 'email',
                'required' : True,
                'placeholder' : 'Email',
            }),
            'username' : forms.TextInput(attrs={
                'id' : 'username',
                'required' : True,
                'placeholder' : 'Username',
            }),
            'id_password1' : forms.TextInput(attrs={
                'id' : 'password',
                'required' : True,
                'placeholder' : 'Password',
            }),
            'id_password2' : forms.TextInput(attrs={
                'id' : 'password',
                'required' : True,
                'placeholder' : 're-enter Password',
            }),
        }

    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.is_user = True
        user.save()
        return user