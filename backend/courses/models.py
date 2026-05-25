from django.db import models

class Department(models.Model):
    dept_name = models.CharField(max_length=255)

    def __str__(self):
        return self.dept_name

class Faculty(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Courses(models.Model):
    course_name = models.CharField(max_length=255)

    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        related_name='courses'
    )
    
    faculty = models.ManyToManyField(Faculty, related_name='courses')

    def __str__(self):
        return self.course_name

class HostelFacility(models.Model):
    room_type = models.CharField(max_length=100)
    total_rooms = models.IntegerField()
    available_rooms = models.IntegerField()

    course = models.ForeignKey(
        Courses,
        on_delete=models.CASCADE,
        related_name='hostel_facilities'
    )

    def __str__(self):
        return f"{self.room_type} - {self.course.course_name}"

