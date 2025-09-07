from django.urls import path
from .auth_views import (
    login_view, register_view, logout_view, 
    profile_view, update_profile_view, change_password_view
)

urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('logout/', logout_view, name='logout'),
    path('profile/', profile_view, name='profile'),
    path('profile/update/', update_profile_view, name='update_profile'),
    path('change-password/', change_password_view, name='change_password'),
]

# Routes d'authentification disponibles :
#
# POST /api/auth/login/
# Body: {"username": "...", "password": "..."}
# Response: {"token": "...", "user": {...}, "message": "..."}
#
# POST /api/auth/register/
# Body: {"username": "...", "email": "...", "password": "...", "password_confirm": "..."}
# Response: {"token": "...", "user": {...}, "message": "..."}
#
# POST /api/auth/logout/
# Header: Authorization: Token <token>
# Response: {"message": "Déconnexion réussie"}
#
# GET /api/auth/profile/
# Header: Authorization: Token <token>
# Response: {"id": 1, "username": "...", "email": "...", ...}
#
# PUT/PATCH /api/auth/profile/update/
# Header: Authorization: Token <token>
# Body: {"email": "...", "first_name": "...", "last_name": "..."}
# Response: {"user": {...}, "message": "..."}
#
# POST /api/auth/change-password/
# Header: Authorization: Token <token>
# Body: {"old_password": "...", "new_password": "...", "new_password_confirm": "..."}
# Response: {"token": "...", "message": "..."}
