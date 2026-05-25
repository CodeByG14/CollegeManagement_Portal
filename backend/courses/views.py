from django.http import JsonResponse
from .models import Courses

def courses_view(request):
    if request.method == "GET":

        courses = Courses.objects.select_related('department').all()

        data = []
        for course in courses:
            data.append({
                "id": course.id,
                "course_name": course.course_name,
                "department": course.department.dept_name
            })

        return JsonResponse(data, safe=False)

    return JsonResponse({"error": "Only GET allowed"}, status=405)

def course_faculty_view(request, course_id):
    if request.method == "GET":

        try:
            course = Courses.objects.prefetch_related('faculty').get(id=course_id)
        except Courses.DoesNotExist:
            return JsonResponse({"error": "Course not found"}, status=404)

        faculty_list = course.faculty.all()

        data = []
        for faculty in faculty_list:
            data.append({
                "id": faculty.id,
                "name": faculty.name
            })

        return JsonResponse(data, safe=False)

    return JsonResponse({"error": "Only GET allowed"}, status=405)

def hostel_facility_view(request, course_id):
    if request.method == "GET":

        try:
            course = Courses.objects.get(id=course_id)
        except Courses.DoesNotExist:
            return JsonResponse({"error": "Course not found"}, status=404)

        facilities = course.hostel_facilities.all()

        data = []
        for facility in facilities:
            data.append({
                "room_type": facility.room_type,
                "total_rooms": facility.total_rooms,
                "available_rooms": facility.available_rooms
            })

        return JsonResponse(data, safe=False)

    return JsonResponse({"error": "Only GET allowed"}, status=405)
