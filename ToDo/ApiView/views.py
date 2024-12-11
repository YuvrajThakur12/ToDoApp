from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer

@api_view(['GET'])
def GetData(request):
    data = User.objects.all()
    serializer = UserSerializer(data, many=True)
    return Response(serializer.data)

# POST request to create a new task
@api_view(['POST'])
def SendData(request):
    title = request.data.get('title')
    description = request.data.get('description')
    User.objects.create(title=title, description=description)
    User.save()

    return Response(response_data)

@api_view(['DELETE'])
def DeleteData(request, pk):
    
    item = User.objects.get(id=pk)
    item.delete()
    
    return Response('Item deleted')

@api_view(['PUT'])
def CheckData(request, pk):
    
    item = User.objects.get(id=pk)
    
    item.completed = not item.completed
    item.save()
    
    return Response('item checked')