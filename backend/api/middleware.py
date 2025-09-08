from django.utils.deprecation import MiddlewareMixin
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AnonymousUser


class CookieTokenMiddleware(MiddlewareMixin):
    """
    Middleware pour extraire le token d'authentification depuis les cookies
    et l'ajouter dans les headers Authorization pour DRF
    """
    
    def process_request(self, request):
        auth_token = request.COOKIES.get('auth_token')
        
        if auth_token:
            
            request.META['HTTP_AUTHORIZATION'] = f'Token {auth_token}'
        
        return None
