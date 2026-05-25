import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Registration
from courses.models import Courses


@csrf_exempt
def registration_view(request):

    if request.method == "POST":
        try:
            data = json.loads(request.body)

            student_name = data.get("student_name")
            email = data.get("email")
            phone = data.get("phone")
            consent = data.get("consent")
            course_id = data.get("course")
            if not all([student_name, email, phone, course_id]) or consent is None:
                return JsonResponse(
                        {"error": "All fields are required"},
                        status=400
                )

            # ✅ Check duplicate email
            if Registration.objects.filter(email=email).exists():
                return JsonResponse(
                    {"error": "Email already registered"},
                    status=400
                )

            # ✅ Get course
            try:
                course = Courses.objects.get(id=course_id)
            except Courses.DoesNotExist:
                return JsonResponse(
                    {"error": "Invalid course ID"},
                    status=400
                )

            # ✅ Save
            registration = Registration.objects.create(
                student_name=student_name,
                email=email,
                phone=phone,
                consent=consent,
                course=course
            )

            return JsonResponse(
                {
                    "message": "Registered successfully",
                    "id": registration.id
                },
                status=201
            )

        except json.JSONDecodeError:
            return JsonResponse(
                {"error": "Invalid JSON"},
                status=400
            )

    return JsonResponse(
        {"error": "Only POST method allowed"},
        status=405
    )
