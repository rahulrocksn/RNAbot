# schatbot/views.py
from django.shortcuts import render
from django.http import JsonResponse
import json

def index(request):
    return render(request, 'schatbot/index.html')

def chat(request):
    if request.method == "POST":
        user_message = json.loads(request.body).get('message')
        # Placeholder for processing the message and generating a response
        response_message = "This is a placeholder response to: " + user_message
        return JsonResponse({"message": response_message})

    return JsonResponse({"error": "Request must be POST."}, status=400)
