from django.db import models
from django.db.models.signals import m2m_changed
from django.dispatch import receiver
# Create your models here.

class Event(models.Model):
    name = models.CharField(max_length=100)
    state = models.IntegerField()
    details = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=150)
    dateTime = models.DateTimeField()

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
    status = models.IntegerField(max_length=1, null=True)
    
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
        self.status = 0
        super(Control, self).save(*args, **kwargs)

class Risk(models.Model):
    name = models.CharField(max_length=100)
    probability = models.DecimalField(max_digits=5, decimal_places=2)
    details = models.TextField(blank=True, null=True)
    impact = models.DecimalField(max_digits=5, decimal_places=2)
    residual_risk = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    inherent_risk = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    controls = models.ManyToManyField(Control, related_name="risks", blank=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        # Primero guardamos el objeto para que se cree en la base de datos.
        super().save(*args, **kwargs)
        
        # Luego calculamos el riesgo inherente después del primer guardado.
        self.inherent_risk = self.calcular_riesgo_inherente()
        self.residual_risk = self.calcular_riesgo_residual()
        super().save(update_fields=['inherent_risk'])
        super().save(update_fields=['residual_risk'])


    def calcular_riesgo_residual(self):
        # Validación de probabilidad e impacto
        if not (0 <= self.probability <= 1) or not (0 <= self.impact <= 1):
            raise ValueError("Los valores de probabilidad e impacto deben estar entre 0 y 1")

        # Calcular riesgo residual con base en el riesgo inherente y la eficacia de los controles
        riesgo_inherente = self.calcular_riesgo_inherente()
        eficacia_controles = self.calcular_eficacia_controles()

        # Si no hay controles, el riesgo residual es igual al inherente
        if eficacia_controles == 0:
            return riesgo_inherente

        return riesgo_inherente * (1 - eficacia_controles)

    def calcular_riesgo_inherente(self):
        return self.probability * self.impact

    def calcular_eficacia_controles(self):
        # Calcula la eficacia combinada de los controles asociados al riesgo
        if self.pk:  # Verifica que el objeto Risk tenga un ID
            controles = self.controls.all()  # Suponiendo que tienes una relación con el modelo Control
            if controles.exists():
                eficacia_total = 1
                for control in controles:
                    eficacia_total *= (1 - control.efficacy)
                return 1 - eficacia_total
        return 0

@receiver(m2m_changed, sender=Risk.controls.through)
def actualizar_riesgo_residual(sender, instance, action, **kwargs):
    # Verifica si la instancia es del modelo `Risk`
    if isinstance(instance, Risk):
        # Solo recalcular el riesgo residual cuando se añaden controles
        if action == 'post_add':
            # Actualiza el riesgo residual después de asociar un nuevo control
            instance.refresh_from_db()  # Asegúrate de tener la instancia más reciente
            instance.residual_risk = instance.calcular_riesgo_residual()
            instance.save(update_fields=['residual_risk'])
class Process(models.Model):
    name = models.CharField(max_length=100)
    details = models.TextField(blank=True, null=True)
    events = models.ManyToManyField(Event, related_name="processes", blank=True)
    risks = models.ManyToManyField(Risk, related_name="processes", blank=True)

    def __str__(self):
        return self.name
