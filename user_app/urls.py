from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_react_user, name='get_react_user'),
]