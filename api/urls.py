from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('controls/', views.control_list, name='controlsListApi'),
    path('controls/<int:pk>', views.check_control, name='checkControlApi'),

    path('processes/', views.process_list, name='processesListApi'),
    path('processes/<int:pk>', views.check_process, name='checkProcessApi'),

    path('events/', views.event_list, name='eventsListApi'),
    path('events/<int:pk>', views.check_event, name='checkEventApi'),

    path('risks/', views.risk_list, name='risksListApi'),
    path('risks/<int:pk>', views.check_risk, name='checkRiskApi'),

    path('assets/', views.asset_list, name='assetsListApi'),
    path('assets/<int:pk>', views.check_asset, name='checkAssetApi'),
]