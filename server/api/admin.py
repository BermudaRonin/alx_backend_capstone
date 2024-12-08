from django.contrib import admin
from  .models import  Task

class TodoItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_completed', 'date_created', 'owner')

admin.site.register(Task, TodoItemAdmin)
