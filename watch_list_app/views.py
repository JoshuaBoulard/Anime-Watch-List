from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
import json
import requests

# Create your views here.
def get_react_watch(request):
    react_view = open('static/index.html')
    return HttpResponse(react_view)

def get_home_page(request):
    endpoint = 'https://api.jikan.moe/v4/top/anime?limit=5'
    response = requests.get(endpoint)
    response_content = json.loads(response.content)
    return JsonResponse({'data': response_content})

def get_browse_page(request):
    endpoint = 'https://api.jikan.moe/v4/top/anime'
    response = requests.get(endpoint)
    response_content = json.loads(response.content)
    return JsonResponse({'data': response_content})

@api_view(['POST'])
def get_anime_by_id(request):
    idx = request.data['id']
    endpoint = f'https://api.jikan.moe/v4/anime/{idx}/full'
    response = requests.get(endpoint)
    response_content = json.loads(response.content)
    return JsonResponse({'data': response_content})

@api_view(['POST'])
def search_anime(request):
    query = request.data['query']
    endpoint = f'https://api.jikan.moe/v4/anime?q={query}'
    response = requests.get(endpoint)
    response_content = json.loads(response.content)
    return JsonResponse({'data': response_content})