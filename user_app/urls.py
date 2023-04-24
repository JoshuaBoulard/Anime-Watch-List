from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_react_user, name='get_react_user'),
    path('signup/', views.user_sign_up, name='signup'),
    path('login/', views.user_login, name='login'),
    path('curruser/', views.curr_user, name='curruser'),
    path('logout/', views.user_sign_out, name='logout'),
    path('add-to-watch/', views.add_to_watch, name='add_to_watch'),
    path('mylist/', views.get_my_list, name="get_my_list"),
    path('make_note/', views.make_note, name="make_note"),
    path('mycompleted/', views.get_completed, name="get_completed"),
    path('remove_anime/', views.remove_anime, name='remove_anime')
]