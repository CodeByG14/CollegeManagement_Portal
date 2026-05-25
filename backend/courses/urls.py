from django.urls import path
from .views import courses_view, course_faculty_view, hostel_facility_view

urlpatterns = [
    path('courses/', courses_view),
    path('courses/<int:course_id>/faculty/', course_faculty_view),
    path('courses/<int:course_id>/hostel/', hostel_facility_view),
]
