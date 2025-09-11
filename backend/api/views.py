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
    - GET /users/{id}/with_blocs/ : Utilisateur avec ses blocs en projet/complétés
    """
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        return serializers.ModelSerializer
    
    def get_serializer(self, *args, **kwargs):
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
    - POST /comments/ : Ajouter un nouveau commentaire
    """
    queryset = Comment.objects.select_related('user', 'bloc', 'parent')
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def get_queryset(self):
        queryset = super().get_queryset()
        bloc_id = self.request.query_params.get('bloc_id', None)
        if bloc_id is not None:
            queryset = queryset.filter(bloc_id=bloc_id)
        return queryset


class UserBlocCompletionViewSet(viewsets.ModelViewSet):
    
    queryset = UserBlocCompletion.objects.select_related('user', 'bloc', 'bloc__area')
    serializer_class = UserBlocCompletionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):

        queryset = super().get_queryset()
        
        queryset = queryset.filter(user=self.request.user)
        
        bloc_id = self.request.query_params.get('bloc_id', None)
        status_filter = self.request.query_params.get('status', None)
        
        if bloc_id is not None:
            queryset = queryset.filter(bloc_id=bloc_id)
            
        if status_filter is not None:
            queryset = queryset.filter(status=status_filter)
            
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['post'])
    def set_status(self, request):
        """
        POST /user-bloc-completions/set_status/
        Body: {"bloc_id": 1, "status": "complété"}
        """
        bloc_id = request.data.get('bloc_id')
        status_value = request.data.get('status')
        
        if not bloc_id or not status_value:
            return Response(
                {'error': 'bloc_id et status sont requis'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        bloc = get_object_or_404(Bloc, id=bloc_id)
        
        user = request.user
        
        valid_statuses = [choice[0] for choice in UserBlocCompletion.STATUS_CHOICES]
        if status_value not in valid_statuses:
            return Response(
                {'error': f'Status invalide. Choix possibles: {valid_statuses}'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
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


class AreaViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour les zones (lecture seule)
    - GET /areas/ : Liste des zones
    """
    queryset = Area.objects.prefetch_related('blocs')
    serializer_class = AreaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
