from django.contrib import admin
from django.urls import path, include
from django.template.response import TemplateResponse

def home_view(request):
    return TemplateResponse(request, 'home.html')

urlpatterns = [
        path('', home_view),
        path('', include('registrations.urls')),
        path('', include('courses.urls')),
        path('', include('transport.urls')),
        path('admin/', admin.site.urls),
]
