# Create your views here.
from django.shortcuts import redirect, render
from django.utils.text import slugify

from tasks.models import Task

from .forms import AddTaskForm


def home(request):
    num_tasks = Task.objects.count()
    tasks = Task.objects.all()
    print('Hola estoy en el home')
    return render(
        request,
        'tasks/home.html',
        {'num_tasks': num_tasks, 'tasks': tasks},
    )


def task_detail(request, task_slug):
    # print(f'Tiene sentido que {post_id}')
    task = Task.objects.get(slug=task_slug)
    # print(f'Tiene sentido que {post}')
    return render(request, 'tasks/task_detail.html', dict(task=task))


def add_task(request):
    if request.method == 'POST':
        if (task := AddTaskForm(request.POST)).is_valid():
            task = task.save(commit=False)
            task.slug = slugify(task.title)
            task.save()
            return redirect('tasks:home')

    else:
        print('Funciona')
        # print(reques)
        task = AddTaskForm()

    return render(request, 'tasks/add_task.html', dict(form=task))


# def index(request):
#     return HttpResponse("Hello, world. You're at the polls index.")
