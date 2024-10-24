from django.urls import path

from . import views

app_name = 'tasks'


urlpatterns = [
    path('', views.task_list, name='task-list'),
    path('task/<slug:task_slug>/', views.task_detail, name='task-detail'),
    path('done/', views.task_done, name='task-done'),
    path('pending/', views.task_pendig, name='task-pendig'),
    path('add/', views.add_task, name='add-task'),
    path('task/<slug:task_slug>/toggle/', views.task_toggle, name='task-toggle'),
    path('task/<slug:task_slug>/edit/', views.task_edit, name='task-edit'),
    path('task/<slug:task_slug>/delete/', views.task_delete, name='task-delete'),
]
