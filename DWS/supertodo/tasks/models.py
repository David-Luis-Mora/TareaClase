from django.db import models

# Create your models here.


class Task(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True)
    description = models.TextField(max_length=300)
    done = models.BooleanField()
    time_finish = models.DateField()

    def __str__(self):
        return self.title
