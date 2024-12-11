from django.urls import path
from . import views

urlpatterns = [
    path('GetData/', views.GetData),  # Correct path for GET request
    path('SendData/', views.SendData), 
    path('delete/<int:pk>', views.DeleteData,),
    path('cheack/<int:pk>', views.CheckData),
]
