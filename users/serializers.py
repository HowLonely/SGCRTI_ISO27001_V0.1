from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)

#         token['email'] = user.email

#         return token
    
# class MyUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'full_name', 'email', 'password', ]

# class UserSerializer(serializers.ModelSerializer):
#     email = serializers.ReadOnlyField()
#     full_name = serializers.ReadOnlyField()
    
#     class Meta:
#         model = User
#         fields = ['id', 'email', 'full_name', 'avatar', 'date_joined',]