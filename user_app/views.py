from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from django.core.serializers import serialize
from django.forms.models import model_to_dict
from .models import *
import json


# Create your views here.
def get_react_user(request):
    react_view = open('static/index.html')
    return HttpResponse(react_view)

@api_view(["POST"])
def user_sign_up(request):
    print(request.data)
    email = request.data['email']
    password = request.data['password']
    name = request.data['name']
    profile_image = request.data['profile_image']
    super_user = False
    staff = False
    # if request.data['super'] in request.data:
    #     super_user = request.data['super']
    # if request.data['staff'] in request.data:
    #     staff = request.data['staff']

    try: 
        new_user = App_User.objects.create_user(username = email, email = email, name = name, password = password, is_superuser = super_user, is_staff = staff, profile_image = profile_image)
        new_user.save()
        return JsonResponse({'success':True})
    except Exception as e:
        print(e)
        return JsonResponse({'success':False})

    # return JsonResponse({'success':True})

@api_view(["POST"])
def user_login(request):
    email = request.data['email']
    password = request.data['password']
    user = authenticate(username=email, password=password)
    if user is not None and user.is_active:
        try:
            login(request._request, user)
            return JsonResponse({'login':True})
        except Exception as e:
            print(e)
            return JsonResponse({'login':False})
    return JsonResponse({'login':False})

@api_view(["GET"])
def curr_user(request):
    if request.user.is_authenticated:
        user_info = serialize('json', [request.user], fields = ['name', 'email', 'profile_image'])
        user_info_workable = json.loads(user_info)
        # print(user_info_workable[0]['fields']['name'])
        return JsonResponse(user_info_workable[0]['fields'])
    return JsonResponse({'user':None})

@api_view(["POST"])
def user_sign_out(request):
    try:
        logout(request)
        return JsonResponse({'Logout':True})

    except Exception as e:
        print(e)
        return JsonResponse({'Logout':False})

@api_view(['POST'])
def add_to_watch(request):
    try:
        new_anime, created = Anime_list.objects.get_or_create(title = request.data['title'], user = request.user, data = request.data['data'])

        if request.data['action'] == 'watch':
            new_anime.completed = False
            new_anime.save()
            return JsonResponse({'added':True})
        elif request.data['action'] == 'complete':
            new_anime.completed = True
            new_anime.save()
            return JsonResponse({'added': 'completed'})
    except Exception as e:
        print(e)
        return JsonResponse({'added':False})

@api_view(['GET'])
def get_my_list(request):
    try:
        watchList = Anime_list.objects.filter(user = request.user, completed = False).values()
        watchListComprehension = [ I for I in watchList ]
        return JsonResponse({'success': watchListComprehension})
    except Exception as e:
        print(e)
        return JsonResponse({'success': False})

@api_view(["POST"])
def make_note(request):
    try:
        animeNote = Anime_list.objects.get(user = request.user, title=request.data['title'])
        print(animeNote.personal_notes)
        animeNote.personal_notes = request.data['note']
        animeNote.save()
        return JsonResponse({'success': True})
    except Exception as e:
        print(e)
        return JsonResponse({'success': False})

@api_view(['GET'])
def get_completed(request):
    try:
        CompletedList = Anime_list.objects.filter(user = request.user, completed = True).values()
        CompletedListComprehension = [ I for I in CompletedList ]
        return JsonResponse({'success': CompletedListComprehension})
    except Exception as e:
        print(e)
        return JsonResponse({'success': False})

@api_view(['POST'])
def remove_anime(request):
    try:
        anime_to_remove = Anime_list.objects.get(user=request.user, title=request.data['title'])
        anime_to_remove.delete()
        return JsonResponse({'success': True})
    except Exception as e:
        print(e)
        return JsonResponse({'success': False})