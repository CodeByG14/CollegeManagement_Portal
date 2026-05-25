from django.db import models


class Route(models.Model):
    route_name = models.CharField(max_length=255)

    def __str__(self):
        return self.route_name


class Bus(models.Model):
    bus_number = models.CharField(max_length=50)

    route = models.ForeignKey(
        Route,
        on_delete=models.CASCADE,
        related_name='buses'
    )

    total_seats = models.IntegerField()
    available_seats = models.IntegerField()

    def __str__(self):
        return self.bus_number
