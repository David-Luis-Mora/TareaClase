from django import forms

from .models import Task

# class AddTaskForm(forms.Form):
#     title = forms.CharField(max_length=100)
#     description = forms.CharField(widget=forms.widgets.Textarea)
#     time_finish = forms.DateField()


class AddTaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ('title',)
