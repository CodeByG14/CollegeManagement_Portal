from django.urls import path
from .views import route_buses_view

urlpatterns = [
    path('routes/<int:route_id>/buses/', route_buses_view),
]
