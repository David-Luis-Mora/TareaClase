from django.db import models

# Create your models here.

from django.db import models

# Create your models here.


class Task(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True)
    description = models.TextField(max_length=300)
    done = models.BooleanField()
    complete_before = models.DateField()
    created_at = models.DateField()
    updated_at = models.DateField()

    def __str__(self):
        return self.title
