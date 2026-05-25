from django.http import JsonResponse
from .models import Route


def route_buses_view(request, route_id):
    if request.method == "GET":

        try:
            route = Route.objects.prefetch_related('buses').get(id=route_id)
        except Route.DoesNotExist:
            return JsonResponse({"error": "Route not found"}, status=404)

        buses = route.buses.all()

        data = []
        for bus in buses:
            data.append({
                "bus_id": bus.id,
                "bus_number": bus.bus_number,
                "total_seats": bus.total_seats,
                "available_seats": bus.available_seats
            })

        return JsonResponse(data, safe=False)

    return JsonResponse({"error": "Only GET allowed"}, status=405)
