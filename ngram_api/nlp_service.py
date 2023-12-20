# ngram_api/nlp_service.py
from nltk import ngrams
def get_ngrams(text, n):
    words = text.split()
    return list(ngrams(words, n))

def compare_ngrams(text1, text2, n):
    ngrams1 = set(get_ngrams(text1, n))
    ngrams2 = set(get_ngrams(text2, n))

    common_ngrams = ngrams1.intersection(ngrams2)
    similarity = len(common_ngrams) / max(len(ngrams1), len(ngrams2))

    return similarity
