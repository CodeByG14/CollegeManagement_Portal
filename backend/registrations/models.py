from django.db import models
from courses.models import Courses

class Registration(models.Model):
    student_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    consent = models.BooleanField(default=False)

    course = models.ForeignKey(
        Courses,
        on_delete=models.CASCADE
    )
