from django.urls import path

from . import views


app_name = 'tasks'



urlpatterns = [
    path('', views.task_list, name='task-list'),
    path('done/', views.task_done, name='task-task_done'),
    path('pending/', views.task_pendig, name='task_pendig'),
    path('add/', views.add_task, name='add_task'),
    # path('<post_slug>', views.post_detail, name='post-detail'),
]