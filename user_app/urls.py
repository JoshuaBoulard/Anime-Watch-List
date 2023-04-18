from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_react_user, name='get_react_user'),
    path('signup/', views.user_sign_up, name='signup'),
    path('login/', views.user_login, name='login'),
    path('curruser/', views.curr_user, name='curruser'),
    path('logout/', views.user_sign_out, name='logout'),
]