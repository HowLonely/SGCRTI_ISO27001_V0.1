from rest_framework import status, generics
from django.shortcuts import redirect
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django.http import JsonResponse

#from .serializers import MyTokenObtainPairSerializer, MyUserSerializer, UserSerializer
from backend.permissions import IsUserOrReadOnly

client = "http://localhost:5173"

def email_confirmation(request, key):
    return redirect(f"{client}/dj-rest-auth/registration/account-confirm-email/{key}")

def reset_password_confirm(request, uid, token):
    return redirect(f"{client}/dj-rest-auth/reset/password/confirm/{uid}/{token}")



# class MyTokenObtainPairSerializer(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer

# @api_view(['POST'])
# def register(request):
#     data = request.data

#     # CORREGIR USERNAME 
#     user = User.objects.create(
#         full_name = data['full_name'],
#         email = data['email'],
#         password = make_password(data['password']),
#     )
#     serializer = MyUserSerializer(user, many=False)
#     return Response(serializer.data)

# # PROFILE (No necesario)
# class UserDetailsView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [IsAuthenticated, IsUserOrReadOnly]
#     lookup_field = 'id'
#     lookup_url_kwarg = 'id'