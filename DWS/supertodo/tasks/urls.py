# from django.contrib import admin
from django.urls import path

from . import views

app_name = 'tasks'

urlpatterns = [
    path('', views.home, name='task'),
    path('task/<task_id>/', views.task_detail, name='task_detail'),
]
