from django.shortcuts import render
from api.models import Control, Process, Event, Risk, Asset
from django.http import JsonResponse
from api.serializers import ControlSerializer, ProcessSerializer, EventSerializer, RiskSerializer, AssetSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET', 'POST'])
def control_list(req):
    if req.method == 'GET':
        controls = Control.objects.all()
        serializer = ControlSerializer(controls, many=True)
        return Response(serializer.data)
    
    if req.method == 'POST':
        risk_ids = req.data.get('risks')  # Obtenemos la lista de riesgos

        if not isinstance(risk_ids, list) or not risk_ids:
            return Response({"error": "ID de riesgo inválido o faltante."}, status=status.HTTP_400_BAD_REQUEST)

        risks = Risk.objects.filter(id__in=risk_ids)  # Buscamos todos los riesgos que correspondan a los IDs

        if len(risks) != len(risk_ids):  # Verificamos que todos los riesgos existan
            return Response({"error": "Uno o más riesgos no se encontraron."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ControlSerializer(data=req.data)
        if serializer.is_valid():
            control = serializer.save()
            control.risks.set(risk_ids)  # Asociamos los IDs de los riesgos al control
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def check_control(req, pk):
    try:
        control = Control.objects.get(id=pk)
    except Control.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if req.method == 'GET':
        serializer = ControlSerializer(control)
        return Response(serializer.data)

    if req.method == 'PUT':
        serializer = ControlSerializer(control,data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)
    
    if req.method == 'DELETE':
        control.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def process_list(req):
    if req.method == 'GET':
        processes = Process.objects.all()
        serializer = ProcessSerializer(processes, many=True)
        return Response(serializer.data)
    
    if req.method == 'POST':
        serializer = ProcessSerializer(data = req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])
def check_process(req, pk):
    try:
        process = Process.objects.get(id=pk)
    except Process.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if req.method == 'GET':
        serializer = ProcessSerializer(process)
        return Response(serializer.data)

    if req.method == 'PUT':
        serializer = ProcessSerializer(process,data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)
    
    if req.method == 'DELETE':
        process.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def event_list(req):
    if req.method == 'GET':
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)
    
    if req.method == 'POST':
        serializer = EventSerializer(data = req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])
def check_event(req, pk):
    try:
        event = Event.objects.get(id=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if req.method == 'GET':
        serializer = EventSerializer(event)
        return Response(serializer.data)

    if req.method == 'PUT':
        serializer = EventSerializer(event,data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)
    
    if req.method == 'DELETE':
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET', 'POST'])
def risk_list(req):
    if req.method == 'GET':
        risks = Risk.objects.all()
        serializer = RiskSerializer(risks, many=True)
        return Response(serializer.data)
    
    if req.method == 'POST':
        serializer = RiskSerializer(data = req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])
def check_risk(req, pk):
    try:
        risk = Risk.objects.get(id=pk)
    except Risk.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if req.method == 'GET':
        serializer = RiskSerializer(risk)
        return Response(serializer.data)

    if req.method == 'PUT':
        serializer = RiskSerializer(risk,data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)
    
    if req.method == 'DELETE':
        risk.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def asset_list(req):
    if req.method == 'GET':
        assets = Asset.objects.all()
        serializer = AssetSerializer(assets, many=True)
        return Response(serializer.data)
    
    if req.method == 'POST':
        serializer = AssetSerializer(data = req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])
def check_asset(req, pk):
    try:
        asset = Asset.objects.get(id=pk)
    except Asset.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if req.method == 'GET':
        serializer = AssetSerializer(asset)
        return Response(serializer.data)

    if req.method == 'PUT':
        serializer = AssetSerializer(asset,data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)
    
    if req.method == 'DELETE':
        asset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
