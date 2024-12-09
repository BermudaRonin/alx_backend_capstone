from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from .models import Task
from .serializers import TaskSerializer, UserSerializer


@api_view(["GET"])
def apiOverview(request):
    overview = {
        "Register user": "POST - /api/users/register/",
        "Login": "POST - /api/users/login/",
        "Get user details": "GET - /api/users/current/",
        "Update user details": "PATCH - /api/users/current/",
        "Delete user": "DELETE - /api/users/current/",
        "Get all tasks": "GET - /api/tasks/",
        "Get completed tasks": "GET - /api/tasks?completed=true",
        "Get pending tasks": "GET - /api/tasks?completed=false",
        "Create a task": "POST - /api/tasks/",
        "Get task details": "GET - /api/tasks/:id/",
        "Edit task details": "PATCH - /api/tasks/:id/",
        "Set task as completed": "PATCH - /api/tasks/:id/completed",
        "Set task as pending": "PATCH - /api/tasks/:id/pending",
        "Delete task": "DELETE - /api/tasks/:id/",
    }
    return Response(overview)


## User Views


@api_view(["POST"])
def registerUser(request):
    data = request.data
    username = data.get("username")
    password = data.get("password")

    valid = username and password
    if not valid:
        return Response(
            {"error": "Username and password are required"}, status=HTTP_400_BAD_REQUEST
        )

    exists = User.objects.filter(username=username).exists()
    if exists:
        return Response(
            {"error": "Username already exists"}, status=HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(username=username, password=password)
    return Response(
        {"message": "User registered successfully", "id": user.id},
        status=HTTP_201_CREATED,
    )


@api_view(["POST"])
def loginUser(request):
    data = request.data
    username = data.get("username")
    password = data.get("password")

    valid = username and password
    if not valid:
        return Response(
            {"error": "Username and password are required"}, status=HTTP_400_BAD_REQUEST
        )

    user = authenticate(username=username, password=password)
    if not user:
        return Response({"error": "Invalid credentials"}, status=HTTP_400_BAD_REQUEST)

    token, _ = Token.objects.get_or_create(user=user)
    return Response(
        {
            "message": "User logged in successfully",
            "token": token.key,
            "id": user.id,  # for testing purposes
        }
    )


@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def currentUser(request):

    if request.method == "GET":
        user = request.user
        user = User.objects.get(id=user.id)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)

    elif request.method == "PATCH":
        return Response({"message": "User details updated successfully"})
    
    elif request.method == "DELETE":
        return Response({"message": "User deleted successfully"})
    


## Tasks Views


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def tasks(request):

    if request.method == "POST":
        data = request.data
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, HTTP_201_CREATED)
        else:
            return Response(serializer.errors, HTTP_400_BAD_REQUEST)
        
    elif request.method == "GET":
        completed = request.GET.get('completed', '')
        
        if completed == 'true':
            data = Task.objects.filter(owner=request.user, is_completed=True)
            serializer = TaskSerializer(data, many=True)
            return Response(serializer.data)
        elif completed == 'false':
            data = Task.objects.filter(owner=request.user, is_completed=False)
            serializer = TaskSerializer(data, many=True)
            return Response(serializer.data)
        else:
            data = Task.objects.filter(owner=request.user)
            serializer = TaskSerializer(data, many=True)
            return Response(serializer.data)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=HTTP_400_BAD_REQUEST)


@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def task(request, id):
    exists = Task.objects.filter(id=id).exists()
    if not exists:
        return JsonResponse({"error": "Task not found"}, status=HTTP_400_BAD_REQUEST)

    if request.method == "GET":
        task = Task.objects.get(id=id)
        serializer = TaskSerializer(task, many=False)
        return Response(serializer.data)
    elif request.method == "PATCH":
        data = request.data
        task = Task.objects.get(id=id)
        serializer = TaskSerializer(instance=task, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        else:
            return JsonResponse(serializer.errors, status=HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        task = Task.objects.get(id=id)
        task.delete()
        return JsonResponse({"message": "Task deleted successfully"})
    else: 
        return JsonResponse({"error": "Invalid request method"}, status=HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])

def markTaskAsCompleted(request, id):
    task = Task.objects.get(id=id)
    task.is_completed = True
    serializer = TaskSerializer(instance=task, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    else:
        return JsonResponse(serializer.errors, status=HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])

def markTaskAsPending(request, id):
    task = Task.objects.get(id=id)
    task.is_completed = False
    serializer = TaskSerializer(instance=task, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    else:
        return JsonResponse(serializer.errors, status=HTTP_400_BAD_REQUEST)
