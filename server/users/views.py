from rest_framework.response import Response
from rest_framework import status 
from rest_framework.views import APIView
from rest_framework.authentication import authenticate
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterUserSerializer
from .models import NewUser

class ListCreateUserView(APIView):
    permission_classes = [AllowAny]
    queryset = NewUser.objects.all()
    serializer_class = RegisterUserSerializer

    def get(self, request, *args, **kwargs):
        user_name = request.GET.get('user_name')
        if user_name:
            user = self.queryset.get(user_name=user_name)
            serializer = self.serializer_class(user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)   

    def post(self, request):        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                user = authenticate(username=user.user_name, password=request.data["password"])
                if user:
                    refresh = RefreshToken.for_user(user)
                    res = {
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                    }
                    return Response(res, status=status.HTTP_201_CREATED)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    serializer_class = RegisterUserSerializer
    
    def put(self, request):
        serializer = self.serializer_class(request.user, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutUserView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self,request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response("Successful Logout", status=status.HTTP_200_OK)
        except :
            return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)
        