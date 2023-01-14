from django.urls import path
from .views import platform_view

urlpatterns = [
    path('<str:platform>/<str:username>/', platform_view),
]