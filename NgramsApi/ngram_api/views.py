# ngram_api/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .nlp_service import compare_ngrams

@api_view(['POST'])
def ngram_comparison(request):
    data = request.data
    text1 = data.get('text1', '')
    text2 = data.get('text2', '')
    n = int(data.get('n', 2))  # Default to bigrams

    similarity = compare_ngrams(text1, text2, n)

    return Response({'similarity': similarity})
