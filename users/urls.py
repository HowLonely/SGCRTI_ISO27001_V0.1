from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

from .views import email_confirmation, reset_password_confirm

urlpatterns = [
    # path('register/', views.register),
    # path('login/', views.MyTokenObtainPairSerializer.as_view()),
    # path('refresh/', TokenRefreshView.as_view()),
    # path('user/<int:id>', views.UserDetailsView.as_view()),

    # path('dj-rest-auth/', include('dj_rest_auth.urls')),
    # path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    # path('dj-rest-auth/registration/account-confirm-email/<str:key>/', email_confirmation),
    # path('reset/password/confirm/<int:uid>/<str:token>', reset_password_confirm, name="password_reset_confirm"),
]



