from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})


class RegisterSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    password_confirm = serializers.CharField(write_only=True, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password_confirm']
    
    def validate(self, attrs):
        
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Les mots de passe ne correspondent pas.")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']
        read_only_fields = ['id', 'username', 'date_joined']


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    POST /api/auth/login/
    Body: {"username": "...", "password": "..."}
    """
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            
            response = Response({
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                },
                'message': 'Connexion réussie'
            }, status=status.HTTP_200_OK)
            
            response.set_cookie(
                'auth_token',
                token.key,
                max_age=86400,  # 24 heures
                httponly=True,
                secure=False,  # True en production avec HTTPS
                samesite='Lax'
            )
            
            return response
        else:
            return Response({
                'error': 'Nom d\'utilisateur ou mot de passe incorrect'
            }, status=status.HTTP_401_UNAUTHORIZED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """
    POST /api/auth/register/
    Body: {"username": "...", "email": "...", "password": "...", "password_confirm": "..."}
    """
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            },
            'message': 'Inscription réussie'
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout_view(request):
    """
    POST /api/auth/logout/
    """
    try:
        request.user.auth_token.delete()
        
        response = Response({
            'message': 'Déconnexion réussie'
        }, status=status.HTTP_200_OK)
        
        response.delete_cookie('auth_token')
        
        return response
    except:
        response = Response({
            'error': 'Erreur lors de la déconnexion'
        }, status=status.HTTP_400_BAD_REQUEST)
        
        response.delete_cookie('auth_token')
        
        return response


@api_view(['GET'])
def profile_view(request):
    """
    GET /api/auth/profile/
    """
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data)


@api_view(['PUT', 'PATCH'])
def update_profile_view(request):
    """
    PUT/PATCH /api/auth/profile/update/
    """
    serializer = UserProfileSerializer(request.user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'user': serializer.data,
            'message': 'Profil mis à jour avec succès'
        })
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def change_password_view(request):
    """
    POST /api/auth/change-password/
    Body: {"old_password": "...", "new_password": "...", "new_password_confirm": "..."}
    """
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')
    new_password_confirm = request.data.get('new_password_confirm')
    
    if not all([old_password, new_password, new_password_confirm]):
        return Response({
            'error': 'Tous les champs sont requis'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    if new_password != new_password_confirm:
        return Response({
            'error': 'Les nouveaux mots de passe ne correspondent pas'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    if not request.user.check_password(old_password):
        return Response({
            'error': 'Ancien mot de passe incorrect'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    request.user.set_password(new_password)
    request.user.save()
    
    request.user.auth_token.delete()
    token = Token.objects.create(user=request.user)
    
    response = Response({
        'message': 'Mot de passe changé avec succès'
    })
    
    response.set_cookie(
        'auth_token',
        token.key,
        max_age=86400,  # 24 heures
        httponly=True,
        secure=False,  # True en production avec HTTPS
        samesite='Lax'
    )
    
    return response
