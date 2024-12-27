from rest_framework import serializers
from authentification.models import User
from .models import Medecin, Patient, DossierPatient
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
class PatientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = ['numero_securite_sociale', 'user', 'date_naissance', 'adresse', 'telephone', 'mutuelle', 'medecin_traitant', 'personne_contact_nom', 'personne_contact_telephone']

    def validate_numero_securite_sociale(self, value):
        # Vérification du format du NSS (15 chiffres)
        if not value.isdigit() or len(value) != 15:
            raise serializers.ValidationError(
                "Le numéro de sécurité sociale doit contenir exactement 15 chiffres."
            )
        # Vérification de l'unicité
        if Patient.objects.filter(numero_securite_sociale=value).exists():
            raise serializers.ValidationError(
                "Ce numéro de sécurité sociale existe déjà dans la base de données."
            )
        return value

    def validate_telephone(self, value):
        # Vérification du format du numéro de téléphone
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError(
                "Le numéro de téléphone doit contenir exactement 10 chiffres."
            )
        return value

    def create(self, validated_data):
        try:
            # Création du patient
            patient = Patient.objects.create(
                **validated_data
            )
            return patient
        except Exception as e:
            raise serializers.ValidationError(f"Erreur lors de la création du patient: {str(e)}")
    
class DossierPatientSerializer(serializers.ModelSerializer):
    # Champ supplémentaire pour inclure les informations du patient
    patient_info = serializers.SerializerMethodField()

    class Meta:
        model = DossierPatient
        fields = ['NSS', 'date_derniere_mise_a_jour', 'patient_info']

    def get_patient_info(self, obj):
        """
        Retourne les informations du patient associé à ce dossier.
        """
        patient = obj.NSS
        return {
            'numero_securite_sociale': patient.numero_securite_sociale,
            'nom': patient.get_nom(),
            'prenom': patient.get_prenom(),
            'date_naissance': patient.date_naissance,
            'adresse': patient.adresse,
            'telephone': patient.telephone,
            'mutuelle': patient.mutuelle,
            'medecin_traitant': str(patient.medecin_traitant) if patient.medecin_traitant else None
        }

    def validate_NSS(self, value):
        """
        Vérifie que le NSS correspond à un patient existant et que le médecin authentifié est le médecin traitant.
        """
        try:
            patient = Patient.objects.get(numero_securite_sociale=value)
        except Patient.DoesNotExist:
            raise serializers.ValidationError(
                "Aucun patient trouvé avec ce numéro de sécurité sociale."
            )

        # Vérifie que le médecin authentifié est bien le médecin traitant
        if patient.medecin_traitant is None or patient.medecin_traitant.user != self.context['request'].user:
            raise serializers.ValidationError(
                "Vous n'êtes pas le médecin traitant de ce patient."
            )
        return value

    def validate(self, data):
        """
        Validation supplémentaire pour s'assurer qu'un dossier n'existe pas déjà pour ce patient.
        """
        nss = data.get('NSS')
        if DossierPatient.objects.filter(NSS=nss).exists():
            raise serializers.ValidationError(
                {"NSS": "Un dossier existe déjà pour ce patient."}
            )
        return data

    def create(self, validated_data):
        """
        Création d'un dossier patient.
        """
        try:
            dossier = DossierPatient.objects.create(**validated_data)
            return dossier
        except Exception as e:
            raise serializers.ValidationError(f"Erreur lors de la création du dossier: {str(e)}")

