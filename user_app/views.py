from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from django.core.serializers import serialize
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
        print(user_info_workable[0]['fields']['name'])
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