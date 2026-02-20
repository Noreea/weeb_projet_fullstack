from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET"])
def health_check(request):
    """
    Endpoint de santé pour monitoring (UptimeRobot, etc.)
    """
    return JsonResponse({
        "status": "ok",
        "service": "weeb_api",
        "environment": "production"
    })

@require_http_methods(["GET"])
def error_test(request):
    """
    Endpoint de test pour Sentry (à supprimer après validation)
    """
    division_by_zero = 1 / 0
    return JsonResponse({"error": "This should never be reached"})
