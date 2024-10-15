# from django.contrib import admin
from django.urls import path

from . import views

app_name = 'tasks'

urlpatterns = [
    path('', views.home, name='home'),
    path('task/<task_slug>/', views.task_detail, name='task_detail'),
    path('add_task/', views.add_task, name='add_task'),
]
