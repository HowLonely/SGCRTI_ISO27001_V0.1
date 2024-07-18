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
    type = models.CharField(max_length=20)
    frequency = models.CharField(max_length=20)
    flexibility = models.CharField(max_length=20)
    execution = models.CharField(max_length=20)
    efficacy = models.DecimalField(max_digits=5, decimal_places=2, blank=True)
    details = models.TextField(blank=True, null=True)
    risks = models.ManyToManyField(Risk, related_name="controls", blank=True, null=True)

    def __str__(self):
        return self.name
    
    def calculate_efficacy(self):
        type_weights = {
            "correctivo": 0.25,
            "detectivo": 0.5,
            "preventivo": 0.75,
        }

        frequency_weights = {
            "anual": 0.2,
            "mensual": 0.4,
            "semanal": 0.6,
            "diario": 0.8,
        }

        flexibility_weights = {
            "bajo": 0.25,
            "medio": 0.5,
            "alto": 0.75,
        }

        execution_weights = {
            "manual": 0.25,
            "combinado": 0.5,
            "automatico": 0.75,
        }

        type_weight = type_weights.get(self.type, 0)
        frequency_weight = frequency_weights.get(self.frequency, 0)
        flexibility_weight = flexibility_weights.get(self.flexibility, 0)
        execution_weight = execution_weights.get(self.execution, 0)

        # Calculate efficacy as a weighted sum or average of the weights
        self.efficacy = (type_weight + frequency_weight + flexibility_weight + execution_weight) / 4

    def save(self, *args, **kwargs):
        self.calculate_efficacy()
        super(Control, self).save(*args, **kwargs)