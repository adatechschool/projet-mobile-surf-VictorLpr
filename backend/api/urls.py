from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, BlocViewSet, CommentViewSet, 
    UserBlocCompletionViewSet, AreaViewSet
)
from django.http import JsonResponse
   
def root_view(request):
    return JsonResponse({"message": "API Django BleauBlocs"})


router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'blocs', BlocViewSet, basename='bloc')
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'user-bloc-completions', UserBlocCompletionViewSet, basename='userbloccompletion')
router.register(r'areas', AreaViewSet, basename='area')

urlpatterns = [
    path('', root_view),
    path('api/', include(router.urls)),
    path('api/auth/', include('api.auth_urls')),
]

# Routes générées automatiquement par le router :
# 
# USERS:
# GET /api/users/                    - Liste des utilisateurs (infos basiques)
# GET /api/users/{id}/               - Détails d'un utilisateur (infos basiques)
# GET /api/users/{id}/with_blocs/    - Utilisateur avec ses blocs en projet/complétés
#
# BLOCS:
# GET /api/blocs/                    - Liste des blocs
# GET /api/blocs/{id}/               - Détails d'un bloc avec commentaires
# POST /api/blocs/                   - Créer un nouveau bloc (user_id automatique)
# PUT/PATCH /api/blocs/{id}/         - Modifier un bloc
# DELETE /api/blocs/{id}/            - Supprimer un bloc
#
# COMMENTAIRES:
# GET /api/comments/                 - Liste des commentaires
# GET /api/comments/{id}/            - Détails d'un commentaire
# POST /api/comments/                - Ajouter un commentaire (user_id automatique)
# PUT/PATCH /api/comments/{id}/      - Modifier un commentaire
# DELETE /api/comments/{id}/         - Supprimer un commentaire
# GET /api/comments/?bloc_id=1       - Filtrer par bloc
#
# USER BLOC COMPLETIONS:
# GET /api/user-bloc-completions/               - Liste des statuts
# POST /api/user-bloc-completions/              - Ajouter/Mettre à jour un statut
# POST /api/user-bloc-completions/set_status/   - Route spéciale pour set/update
# PUT/PATCH /api/user-bloc-completions/{id}/    - Modifier un statut
# DELETE /api/user-bloc-completions/{id}/       - Supprimer un statut
# GET /api/user-bloc-completions/?user_id=1     - Filtrer par utilisateur
# GET /api/user-bloc-completions/?bloc_id=1     - Filtrer par bloc
# GET /api/user-bloc-completions/?status=complété - Filtrer par statut
#
# AREAS:
# GET /api/areas/                    - Liste des zones
# GET /api/areas/{id}/               - Détails d'une zone
