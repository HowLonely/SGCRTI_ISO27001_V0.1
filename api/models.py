from django.db import models

# Create your models here.
# nombre, eficacia , detalles
class Control(models.Model):
    name = models.CharField(max_length=100)
    efficiency = models.DecimalField(max_digits=5, decimal_places=2)
    details = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Process(models.Model):
    name = models.CharField(max_length=100)
    efficiency = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.name
