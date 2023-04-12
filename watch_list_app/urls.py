from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_react_watch, name='get_react_watch'),
]