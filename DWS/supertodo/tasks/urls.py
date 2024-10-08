# from django.contrib import admin
from django.urls import path

from . import views

app_name = 'tasks'

urlpatterns = [
    path('', views.home, name='home'),
    # path('posts/<post_id>/', views.post_detail, name='post_detail'),
]
