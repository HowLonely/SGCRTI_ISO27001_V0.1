from django.db import models

# Create your models here.

class Event(models.Model):
    name = models.CharField(max_length=100)
    state = models.IntegerField()
    details = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=150)
    dateTime = models.DateTimeField()

    def __str__(self):
        return self.name

class Risk(models.Model):
    name = models.CharField(max_length=100)
    probability = models.DecimalField(max_digits=5, decimal_places=2)
    details = models.TextField(blank=True, null=True)
    impact = models.DecimalField(max_digits=5, decimal_places=2)
    events = models.ManyToManyField(Event, related_name="risks", blank=True, null=True)

    def __str__(self):
        return self.name
    
class Process(models.Model):
    name = models.CharField(max_length=100)
    details = models.TextField(blank=True, null=True)
    events = models.ManyToManyField(Event, related_name="processes", blank=True, null=True)
    risks = models.ManyToManyField(Risk, related_name="processes", blank=True, null=True)

    def __str__(self):
        return self.name

class Asset(models.Model):
    name = models.CharField(max_length=100)
    criticality = models.DecimalField(max_digits=5, decimal_places=2)
    details = models.TextField(blank=True, null=True)
    risk = models.ForeignKey("Risk", on_delete=models.PROTECT, blank=True, null=True)

    def __str__(self):
        return self.name
    
class Control(models.Model):
    name = models.CharField(max_length=100)
    efficiency = models.DecimalField(max_digits=5, decimal_places=2)
    details = models.TextField(blank=True, null=True)
    risks = models.ManyToManyField(Risk, related_name="controls", blank=True, null=True)

    def __str__(self):
        return self.name