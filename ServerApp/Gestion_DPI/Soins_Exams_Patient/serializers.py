# serializers.py
from rest_framework import serializers
from .models import Soin
from Med_Patient.models import DossierPatient
from .models import Infirmier
class SoinSerializer(serializers.ModelSerializer):
    dossier_patient_id = serializers.IntegerField(write_only=True)
    infirmier_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Soin
        fields = ['dossier_patient_id', 'infirmier_id', 'date_soin', 'description', 'observation']

    def create(self, validated_data):
        dossier_patient = DossierPatient.objects.get(id=validated_data.pop('dossier_patient_id'))
        infirmier = Infirmier.objects.get(id=validated_data.pop('infirmier_id'))
        return Soin.objects.create(dossier_patient=dossier_patient, infirmier=infirmier, **validated_data)