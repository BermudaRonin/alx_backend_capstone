# Generated by Django 5.1.2 on 2024-12-09 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_todoitem_task'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
