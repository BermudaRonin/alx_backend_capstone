from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("", views.apiOverview, name = 'api_overview'),
    # Users endpoints
    path("users/register/", views.registerUser, name ='register-user'),
    path("users/login/", views.loginUser, name = 'login-user'),
    path("users/current/", views.currentUser, name = 'current-user'),
    # Users endpoints
    path("tasks/", views.tasks, name = 'list-tasks'),
    path("tasks/<int:id>/", views.task, name = 'get-task-details'),
    path("tasks/<int:id>/completed/", views.markTaskAsCompleted, name = 'mark-task-as-completed'),
    path("tasks/<int:id>/pending/", views.markTaskAsPending, name = 'mark-task-as-pending'),
]
