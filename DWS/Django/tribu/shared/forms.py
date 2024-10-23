from django import forms
from django.conf import settings


class LoginForm(forms.Form):
    username = forms.SlugField(max_length=64, required=True)
    password = forms.CharField(max_length=64, required=True, widget=forms.PasswordInput)


class SignupForm(forms.ModelForm):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ['first_name', 'username', 'password']
