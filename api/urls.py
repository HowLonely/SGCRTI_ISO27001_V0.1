from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('controls/', views.control_list, name='controlsListApi'),
   
]