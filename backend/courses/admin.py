from django.contrib import admin
from .models import Department, Faculty, Courses, HostelFacility

admin.site.register(Department)
admin.site.register(Faculty)
admin.site.register(Courses)
admin.site.register(HostelFacility)
