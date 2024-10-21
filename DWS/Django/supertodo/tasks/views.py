from django.shortcuts import render

# Create your views here.
from tasks.models import Task

# from .forms import AddTaskForm


def task_list(request):
    # num_tasks = Task.objects.count()
    tasks = Task.objects.all()
    # print('Hola estoy en el home')
    return render(
        request,
        'tasks/task_list.html',
        {'tasks': tasks},
    )


def task_done(request):
    tasks = Task.objects.all()
    return render(
        request,
        'tasks/task_done.html',
        {'tasks': tasks},
    )


def task_pendig(request):
    tasks = Task.objects.all()
    return render(
        request,
        'tasks/tasks_pending.html',
        {'tasks': tasks},
    )


def add_task(request):
    pass
    # if request.method == 'GET':
    #     form = AddPostForm()
    # else:
    #     if (form := AddPostForm(data=request.POST)).is_valid():
    #         post = form.save(commit=False)
    #         post.slug = slugify(post.title)
    #         post.save()
    #         return redirect('blog:home')
    # return render(request, 'blog/post/add.html', dict(form=form))


# def task_detail(request, task_slug):
#     # print(f'Tiene sentido que {post_id}')
#     task = Task.objects.get(slug=task_slug)
#     # print(f'Tiene sentido que {post}')
#     return render(request, 'tasks/task_detail.html', dict(task=task))


# def add_task(request):
#     if request.method == 'POST':
#         if (task := AddTaskForm(request.POST)).is_valid():
#             task = task.save(commit=False)
#             task.slug = slugify(task.title)
#             task.save()
#             return redirect('tasks:home')

#     else:
#         print('Funciona')
#         # print(reques)
#         task = AddTaskForm()

#     return render(request, 'tasks/add_task.html', dict(form=task))
