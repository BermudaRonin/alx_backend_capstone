from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from .models import Task
from .serializers import TaskSerializer

@api_view(['GET'])
def api_overview(request):
    overview = {
        "Get all tasks": "GET - /api/todos",
        "Create task": "POST - /api/todos",
        "Get single task": "GET - /api/todos/:id",
    }
    return Response(overview)

@api_view(['GET'])
def list_tasks(request):
    data = Task.objects.all()
    serializer = TaskSerializer(data, many=True)
    return JsonResponse(serializer.data, safe = False)


@api_view(['POST'])
def create_task(request):
    data = request.data
    serializer = TaskSerializer(data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, HTTP_201_CREATED)
    else:
        return Response(serializer.errors, HTTP_400_BAD_REQUEST)
