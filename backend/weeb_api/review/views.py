from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Review
from .serializers import ReviewSerializer
import os
import json
import pickle
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view



class ReviewViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling contact form submissions.
    Automatically predicts satisfaction score using ML model.
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def create(self, request, *args, **kwargs):
        # Validate data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Predict satisfaction from message
        message = request.data.get('message', '')
        predicted_satisfaction = None
        
        if model and message:
            try:
                predicted_satisfaction = int(model.predict([message])[0])
            except Exception as e:
                print(f"Prediction error: {e}")
        
        # Save review with prediction
        review = serializer.save(predicted_satisfaction=predicted_satisfaction)
        
        return Response({
            'success': True,
            'message': 'Review saved successfully.',
            'results': ReviewSerializer(review).data
        }, status=status.HTTP_201_CREATED)
        

# Chargement du modèle (optionnel)
model = None
try:
    MODEL_PATH = os.path.join(os.path.dirname(__file__), "../../weeb_api_model.pkl")
    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, "rb") as f:
            model = pickle.load(f)
except Exception as e:
    print(f"Modèle non chargé: {e}")
    model = None



@api_view(['POST']) 
def predict(request):

    if request.method == "POST":

        try:

            body = json.loads(request.body)

            features = body["features"]  

            prediction = model.predict([features])[0]
            

            return JsonResponse({"prediction": int(prediction)})

        except Exception as e:

            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"message": "Send a POST request with features."})

        



