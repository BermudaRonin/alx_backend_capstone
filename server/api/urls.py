from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("", views.api_view, name = 'api_overview'),
    path("tasks/", views.list_tasks, name ='list-tasks')
]
