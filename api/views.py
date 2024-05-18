from django.shortcuts import render
from api.models import Control, Process
from django.http import JsonResponse
from api.serializers import ControlSerializer, ProcessSerializer
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
        serializer = ControlSerializer(data = req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
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
