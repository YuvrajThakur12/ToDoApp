from django.db import models

# Create your models here.
class User(models.Model):
    title = models.CharField(max_length=150,default="")
    description = models.CharField(max_length=250,default="")
    completed = models.BooleanField(default=False)