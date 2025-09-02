from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Area(models.Model):
    
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        
        ordering = ['name']

    def __str__(self):
        return self.name


class Bloc(models.Model):
    """
    """
    STARTING_CHOICES = [
        ('assis', 'Assis'),
        ('debout', 'Debout'),
    ]

    STYLE_CHOICES = [
        ('dalle', 'Dalle'),
        ('devers', 'Dévers'),
        ('vertical', 'Vertical'),
        ('toit', 'Toit'),
        ('traverse', 'Traversée'),
        ('mantle', 'Mantle'),
        ('crimps', 'Réglettes'),
        ('slopers', 'Boules'),
        ('jugs', 'Prises franches'),
    ]

    name = models.CharField(max_length=200)
    description = models.TextField()
    starting_position = models.TextField(
        choices=STARTING_CHOICES,
    )
    style = models.CharField(
        max_length=20,
        choices=STYLE_CHOICES,
    )
    level = models.CharField(
        max_length=10,
    )
    area = models.ForeignKey(
        Area,
        on_delete=models.CASCADE,
        related_name='blocs',
    )
    
    # Coordonnées géographiques
    lat = models.DecimalField(
        max_digits=10,
        decimal_places=8,
        validators=[MinValueValidator(-90), MaxValueValidator(90)]
    )
    lng = models.DecimalField(
        max_digits=11,
        decimal_places=8,
        validators=[MinValueValidator(-180), MaxValueValidator(180)]
    )
    
    img_url = models.URLField(null=True,blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='created_blocs',
    )

    class Meta:
       
        ordering = ['area', 'name']

    def __str__(self):
        return f"{self.name} ({self.level}) - {self.area.name}"


class UserBlocCompletion(models.Model):

    STATUS_CHOICES=[
        ('en projet','En Projet'),
        ('complété', 'Complété'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bloc = models.ForeignKey(Bloc, on_delete=models.CASCADE)
    status = models.TextField(choices=STATUS_CHOICES)
    
    class Meta:
        unique_together = ('user', 'bloc')

    def __str__(self):
        return f"{self.user.username} - {self.bloc.name}"


class Comment(models.Model):

    bloc = models.ForeignKey(
        Bloc,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        null=True,
        blank=True,
    )
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='replies'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        if self.parent:
            return f"Réponse de {self.user.username} à {self.parent.user.username} sur {self.bloc.name}"
        return f"Commentaire de {self.user.username} sur {self.bloc.name}"
    
    @property
    def is_reply(self):
        """Retourne True si c'est une réponse à un autre commentaire"""
        return self.parent is not None
    
    @property
    def replies_count(self):
        """Retourne le nombre de réponses à ce commentaire"""
        return self.replies.count()

