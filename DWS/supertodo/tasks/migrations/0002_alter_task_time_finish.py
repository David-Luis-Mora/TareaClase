# Generated by Django 5.1.2 on 2024-10-09 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='time_finish',
            field=models.DateField(),
        ),
    ]