# Create your views here.
from django.shortcuts import render

from tasks.models import Task


def home(request):
    num_tasks = Task.objects.count()
    tasks = Task.objects.all()
    print('Hola estoy en el home')
    return render(
        request,
        'home.html',
        {'num_tasks': num_tasks, 'tasks': tasks},
    )


def task_detail(request, task_slug):
    # print(f'Tiene sentido que {post_id}')
    task = Task.objects.get(slug=task_slug)
    # print(f'Tiene sentido que {post}')
    return render(request, 'task_detail.html', dict(task=task))


# def index(request):
#     return HttpResponse("Hello, world. You're at the polls index.")
