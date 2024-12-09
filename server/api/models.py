from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    name = models.CharField(
        max_length=200
    )
    is_completed = models.BooleanField(
        default=False
    )
    date_created = models.DateTimeField(
        auto_now_add=True,
    )
    owner = models.ForeignKey(
        User,
        models.CASCADE,
        'tasks'
    )

    def __str__(self):
        return self.name
