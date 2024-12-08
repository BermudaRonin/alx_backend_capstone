from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    name = models.CharField(max_length=200)
    is_completed = models.BooleanField()
    date_created = models.DateTimeField()
    owner = models.ForeignKey(User, models.CASCADE, 'todos')

    def __str__(self):
        return self.name
