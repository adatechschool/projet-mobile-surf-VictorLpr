from rest_framework import viewsets, status, serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from .models import Area, Bloc, UserBlocCompletion, Comment
from .serializers import (
    AreaSerializer, BlocSerializer, BlocDetailSerializer,
    UserBlocCompletionSerializer, CommentSerializer, 
    UserWithBlocsSerializer
)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet pour les utilisateurs
    - GET /users/ : Liste des utilisateurs (infos basiques)
    - GET /users/{id}/ : Détails d'un utilisateur (infos basiques)
    - GET /users/{id}/with_blocs/ : Utilisateur avec ses blocs en projet/complétés
    """
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        return serializers.ModelSerializer
    
    def get_serializer(self, *args, **kwargs):
        # Serializer basique pour les infos de base de l'utilisateur
        class BasicUserSerializer(serializers.ModelSerializer):
            class Meta:
                model = User
                fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']
                read_only_fields = ['date_joined']
        
        kwargs['context'] = self.get_serializer_context()
        return BasicUserSerializer(*args, **kwargs)
    
    @action(detail=True, methods=['get'])
    def with_blocs(self, request, pk=None):
        """
        GET /users/{id}/with_blocs/
        Retourne un utilisateur avec ses blocs en projet et complétés
        """
        user = self.get_object()
        serializer = UserWithBlocsSerializer(user, context={'request': request})
        return Response(serializer.data)


class BlocViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour les blocs
    - GET /blocs/ : Liste des blocs
    - GET /blocs/{id}/ : Détails d'un bloc avec commentaires
    - POST /blocs/ : Créer un nouveau bloc
    - PUT/PATCH /blocs/{id}/ : Modifier un bloc
    - DELETE /blocs/{id}/ : Supprimer un bloc
    """
    queryset = Bloc.objects.select_related('area', 'created_by').prefetch_related('comments__user')
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return BlocDetailSerializer
        return BlocSerializer
    
    def perform_create(self, serializer):
        """
        Ajouter l'utilisateur connecté comme créateur du bloc
        """
        serializer.save(created_by=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour les commentaires
    - GET /comments/ : Liste des commentaires
    - GET /comments/{id}/ : Détails d'un commentaire
    - POST /comments/ : Ajouter un nouveau commentaire
    - PUT/PATCH /comments/{id}/ : Modifier un commentaire
    - DELETE /comments/{id}/ : Supprimer un commentaire
    """
    queryset = Comment.objects.select_related('user', 'bloc', 'parent')
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        """
        Ajouter l'utilisateur connecté comme auteur du commentaire
        """
        serializer.save(user=self.request.user)
    
    def get_queryset(self):
        """
        Filtrer les commentaires par bloc si spécifié
        """
        queryset = super().get_queryset()
        bloc_id = self.request.query_params.get('bloc_id', None)
        if bloc_id is not None:
            queryset = queryset.filter(bloc_id=bloc_id)
        return queryset


class UserBlocCompletionViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour la gestion des statuts des blocs (en projet/complété)
    - GET /user-bloc-completions/ : Liste des statuts
    - POST /user-bloc-completions/ : Ajouter/Mettre à jour un statut
    - PUT/PATCH /user-bloc-completions/{id}/ : Modifier un statut
    - DELETE /user-bloc-completions/{id}/ : Supprimer un statut
    """
    queryset = UserBlocCompletion.objects.select_related('user', 'bloc', 'bloc__area')
    serializer_class = UserBlocCompletionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """
        Filtrer par utilisateur connecté ou par paramètres
        """
        queryset = super().get_queryset()
        user_id = self.request.query_params.get('user_id', None)
        bloc_id = self.request.query_params.get('bloc_id', None)
        status_filter = self.request.query_params.get('status', None)
        
        if user_id is not None:
            queryset = queryset.filter(user_id=user_id)
        
        if bloc_id is not None:
            queryset = queryset.filter(bloc_id=bloc_id)
            
        if status_filter is not None:
            queryset = queryset.filter(status=status_filter)
            
        return queryset
    
    def perform_create(self, serializer):
        """
        Ajouter l'utilisateur connecté si pas spécifié
        """
        if 'user' not in serializer.validated_data:
            serializer.save(user=self.request.user)
        else:
            # Permettre de spécifier l'utilisateur dans la requête
            serializer.save()
    
    @action(detail=False, methods=['post'])
    def set_status(self, request):
        """
        POST /user-bloc-completions/set_status/
        Route spéciale pour définir/mettre à jour le statut d'un bloc
        Body: {"bloc_id": 1, "status": "complété", "user_id": 2 (optionnel)}
        """
        bloc_id = request.data.get('bloc_id')
        status_value = request.data.get('status')
        user_id = request.data.get('user_id', request.user.id)
        
        if not bloc_id or not status_value:
            return Response(
                {'error': 'bloc_id et status sont requis'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Vérifier que le bloc existe
        bloc = get_object_or_404(Bloc, id=bloc_id)
        user = get_object_or_404(User, id=user_id)
        
        # Vérifier que le status est valide
        valid_statuses = [choice[0] for choice in UserBlocCompletion.STATUS_CHOICES]
        if status_value not in valid_statuses:
            return Response(
                {'error': f'Status invalide. Choix possibles: {valid_statuses}'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Créer ou mettre à jour
        completion, created = UserBlocCompletion.objects.update_or_create(
            user=user,
            bloc=bloc,
            defaults={'status': status_value}
        )
        
        serializer = UserBlocCompletionSerializer(completion)
        return Response(
            {
                'message': 'Statut créé' if created else 'Statut mis à jour',
                'data': serializer.data
            }, 
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
        )


class AreaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet pour les zones (lecture seule)
    - GET /areas/ : Liste des zones
    - GET /areas/{id}/ : Détails d'une zone
    """
    queryset = Area.objects.prefetch_related('blocs')
    serializer_class = AreaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
