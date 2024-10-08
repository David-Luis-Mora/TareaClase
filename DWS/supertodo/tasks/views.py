from blog.models import Task

# Create your views here.
from django.shortcuts import render


def home(request):
    num_posts = Task.objects.count()
    posts = Task.objects.all()
    print('Hola estoy en el home')
    return render(
        request,
        'home.html',
        {'num_posts': num_posts, 'posts': posts},
    )


# def index(request):
#     return HttpResponse("Hello, world. You're at the polls index.")
