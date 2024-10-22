from django.contrib import admin
from .models import Task

# Register your models here.


class TaskAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'description','done', 'complete_before','created_at','updated_at',]
    prepopulated_fields = {'slug': ['name']}
    pass


admin.site.register(Task, TaskAdmin)