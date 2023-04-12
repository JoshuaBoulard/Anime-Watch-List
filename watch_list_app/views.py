from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def get_react_watch(request):
    react_view = open('static/index.html')
    return HttpResponse(react_view)