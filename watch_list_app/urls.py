from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_react_watch, name='get_react_watch'),
    path('home/', views.get_home_page, name="get_home_page"),
    path('browse/', views.get_browse_page, name="get_browse_page"),
    path('animeById/', views.get_anime_by_id, name="get_anime_by_id"),
    path('search/', views.search_anime, name="search_anime")
]