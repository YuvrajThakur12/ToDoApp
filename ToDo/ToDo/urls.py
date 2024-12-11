from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('ApiView/',include('ApiView.urls')),
    path('admin/', admin.site.urls),
]
