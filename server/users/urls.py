from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from .views import ListCreateUserView, UpdateUserView, LogoutUserView

urlpatterns = [
    path('', ListCreateUserView.as_view(), name='list_create_user'),
    path('update/', UpdateUserView.as_view(), name='update_user'),
    path('logout/',LogoutUserView.as_view(),name="logout"),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]