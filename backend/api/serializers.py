from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Area, Bloc, UserBlocCompletion, Comment


class AreaSerializer(serializers.ModelSerializer):
 
    blocs_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Area
        fields = ['id', 'name', 'description', 'created_at', 'updated_at', 'blocs_count']
        read_only_fields = ['created_at', 'updated_at']
    
    def get_blocs_count(self, obj):
        return obj.blocs.count()


class BlocSerializer(serializers.ModelSerializer):

    area_name = serializers.CharField(source='area.name', read_only=True)
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)
    comments_count = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Bloc
        fields = [
            'id', 'name', 'description', 'starting_position', 'style', 'level',
            'area', 'area_name', 'lat', 'lng', 'img_url', 'created_at', 'updated_at',
            'created_by', 'created_by_username', 'comments_count', 'average_rating'
        ]
        read_only_fields = ['created_at', 'updated_at', 'created_by']
    
    def get_comments_count(self, obj):
        return obj.comments.count()
    
    def get_average_rating(self, obj):
        from django.db.models import Avg
        comments_with_rating = obj.comments.filter(rating__isnull=False)
        if comments_with_rating.exists():
            avg_rating = comments_with_rating.aggregate(avg_rating=Avg('rating'))['avg_rating']
            return round(avg_rating, 1) if avg_rating else None
        return None


class UserBlocCompletionSerializer(serializers.ModelSerializer):

    bloc_name = serializers.CharField(source='bloc.name', read_only=True)
    bloc_level = serializers.CharField(source='bloc.level', read_only=True)
    bloc_area = serializers.CharField(source='bloc.area.name', read_only=True)
    
    class Meta:
        model = UserBlocCompletion
        fields = ['id', 'user', 'bloc', 'bloc_name', 'bloc_level', 'bloc_area', 'status']
    
    def create(self, validated_data):

        user = validated_data['user']
        bloc = validated_data['bloc']
        status = validated_data['status']
        
        completion, created = UserBlocCompletion.objects.update_or_create(
            user=user,
            bloc=bloc,
            defaults={'status': status}
        )
        return completion


class CommentSerializer(serializers.ModelSerializer):

    user_username = serializers.CharField(source='user.username', read_only=True)
    bloc_name = serializers.CharField(source='bloc.name', read_only=True)
    replies_count = serializers.ReadOnlyField()
    is_reply = serializers.ReadOnlyField()
    
    class Meta:
        model = Comment
        fields = [
            'id', 'bloc', 'bloc_name', 'user', 'user_username', 'text', 'rating',
            'parent', 'created_at', 'updated_at', 'replies_count', 'is_reply'
        ]
        read_only_fields = ['created_at', 'updated_at', 'user']


class UserWithBlocsSerializer(serializers.ModelSerializer):

    blocs_completed = serializers.SerializerMethodField()
    blocs_in_progress = serializers.SerializerMethodField()
    stats = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 
             'blocs_completed', 'blocs_in_progress', 'stats'
        ]
        read_only_fields = ['date_joined']
    
    def get_blocs_completed(self, obj):
        completed_blocs = UserBlocCompletion.objects.filter(
            user=obj, 
            status='complété'
        ).select_related('bloc', 'bloc__area')
        
        return [{
            'name': completion.bloc.name,
            'level': completion.bloc.level,
            'area': completion.bloc.area.name,
            'img_url': completion.bloc.img_url,
        } for completion in completed_blocs]
    
    def get_blocs_in_progress(self, obj):
        progress_blocs = UserBlocCompletion.objects.filter(
            user=obj, 
            status='en projet'
        ).select_related('bloc', 'bloc__area')
        
        return [{
            'name': completion.bloc.name,
            'level': completion.bloc.level,
            'area': completion.bloc.area.name,
            'img_url': completion.bloc.img_url,
        } for completion in progress_blocs]
    
    def get_stats(self, obj):
        completed_count = UserBlocCompletion.objects.filter(
            user=obj, 
            status='complété'
        ).count()
        
        progress_count = UserBlocCompletion.objects.filter(
            user=obj, 
            status='en projet'
        ).count()
        
        created_blocs_count = obj.created_blocs.count()
        
        return {
            'blocs_completed_count': completed_count,
            'blocs_in_progress_count': progress_count,
            'blocs_created_count': created_blocs_count,
        }


class BlocDetailSerializer(serializers.ModelSerializer):

    area_name = serializers.CharField(source='area.name', read_only=True)
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    user_completion_status = serializers.SerializerMethodField()
    
    class Meta:
        model = Bloc
        fields = [
            'id', 'name', 'description', 'starting_position', 'style', 'level',
            'area', 'area_name', 'lat', 'lng', 'img_url', 'created_at', 'updated_at',
            'created_by', 'created_by_username', 'comments', 'user_completion_status'
        ]
        read_only_fields = ['created_at', 'updated_at', 'created_by']
    
    def get_user_completion_status(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                completion = UserBlocCompletion.objects.get(user=request.user, bloc=obj)
                return completion.status
            except UserBlocCompletion.DoesNotExist:
                return None
        return None
