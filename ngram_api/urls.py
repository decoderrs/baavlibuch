from django.urls import path
from .views import ngram_comparison

urlpatterns = [
    path('ngram-comparison/', ngram_comparison, name= 'ngram_comparison'),
]