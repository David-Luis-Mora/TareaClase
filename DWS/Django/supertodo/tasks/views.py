from django.shortcuts import redirect, render
from django.utils.text import slugify

# Create your views here.
from tasks.models import Task

from .forms import AddTaskForm

# from .forms import AddTaskForm


def task_list(request):
    # tasks = Task.objects.all()
    completed_tasks = Task.objects.filter(done=True)
    pending_tasks = Task.objects.filter(done=False)
    # print(len(tasks))
    for j in completed_tasks:
        print(j.slug)
    return render(
        request,
        'tasks/task_list.html',
        {
            'completed_tasks': completed_tasks,
            'pending_tasks': pending_tasks,
        },
    )


def task_detail(request, task_slug: str):
    # task = Task.objects.all()
    task = Task.objects.get(slug=task_slug)
    return render(request, 'tasks/task_detail.html', dict(task=task))


def task_done(request):
    tasks = Task.objects.filter(done=True)
    return render(
        request,
        'tasks/task_done.html',
        {'tasks': tasks},
    )


def task_pendig(request):
    tasks = Task.objects.filter(done=False)

    return render(
        request,
        'tasks/tasks_pending.html',
        {'tasks': tasks},
    )


def add_task(request):
    pass
    if request.method == 'GET':
        task = AddTaskForm()
    else:
        if (task := AddTaskForm(data=request.POST)).is_valid():
            task = task.save(commit=False)
            task.slug = slugify(task.name)
            task.done = False
            task.save()
            return redirect('tasks:task-list')
    return render(request, 'tasks/add_task.html', dict(form=task))


def task_toggle(request):
    pass


def task_edit(request):
    pass


def task_delete(request):
    pass
