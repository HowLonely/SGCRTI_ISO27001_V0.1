from rest_framework import serializers
from api.models import Control, Process, Event, Risk, Asset

class CustomSerializer(serializers.ModelSerializer):
    def get_field_names(self, declared_fields, info):
        expanded_fields = super(CustomSerializer, self).get_field_names(declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            return expanded_fields + self.Meta.extra_fields
        else:
            return expanded_fields

class ControlSerializer(serializers.ModelSerializer):
    class Meta:
        model = Control
        fields = '__all__'
        extra_kwargs = {'risks': {'required': False}}

class ProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Process
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        extra_fields = ['processes', 'risks']
        extra_kwargs = {'processes': {'required': False}, 'risks': {'required': False}}

class RiskSerializer(CustomSerializer):
    class Meta:
        model = Risk
        fields = '__all__'
        extra_fields = ['processes', 'controls']
        extra_kwargs = {'events': {'required': False}, 'processes': {'required': False}, 'controls': {'required': False}}

class AssetSerializer(CustomSerializer):
    class Meta:
        model = Asset
        fields = '__all__'
        extra_kwargs = {'risk': {'required': False}}
