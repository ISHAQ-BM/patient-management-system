from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from Med_Patient.models import DossierPatient, Patient
from Med_Patient.serializers import DossierPatientSerializer
from authentification.models import User
from .serializers import SoinSerializer
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class RechercherDossierPatientInfirmierAPIView(APIView):
    """
    API permettant à un infirmier authentifié de rechercher un dossier patient en utilisant son NSS.
    """
    permission_classes = [IsAuthenticated]  # Vérifie que l'utilisateur est authentifié

    @swagger_auto_schema(
        operation_description="Recherche un dossier patient via son numéro de sécurité sociale (NSS).",
        manual_parameters=[
            openapi.Parameter(
                'nss',
                openapi.IN_QUERY,
                description="Numéro de sécurité sociale du patient à rechercher.",
                type=openapi.TYPE_STRING,
                required=True,
            )
        ],
        responses={
            200: DossierPatientSerializer(),
            400: "Le paramètre 'nss' est requis.",
            403: "Seul un infirmier peut effectuer cette recherche.",
            404: "Patient ou dossier non trouvé.",
        },
    )
    def get(self, request, *args, **kwargs):
        """
        Recherche un dossier patient via son numéro de sécurité sociale (NSS).
        Vérifie que l'utilisateur connecté est un infirmier.
        """
        # Vérifie que l'utilisateur a le rôle d'infirmier
        if not hasattr(request.user, 'infirmier'):
            return Response(
                {"detail": "Seul un infirmier peut effectuer cette recherche."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Récupère le NSS depuis les paramètres de la requête
        nss = request.query_params.get('nss', None)
        if not nss:
            return Response({"detail": "Le paramètre 'nss' est requis."}, status=status.HTTP_400_BAD_REQUEST)

        # Vérifie que le patient existe
        try:
            patient = Patient.objects.get(numero_securite_sociale=nss)
        except Patient.DoesNotExist:
            return Response({"detail": "Aucun patient trouvé avec ce numéro de sécurité sociale."}, status=status.HTTP_404_NOT_FOUND)

        # Récupère le dossier patient associé
        try:
            dossier_patient = DossierPatient.objects.get(NSS=patient)
        except DossierPatient.DoesNotExist:
            return Response({"detail": "Aucun dossier trouvé pour ce patient."}, status=status.HTTP_404_NOT_FOUND)

        # Sérialise le dossier patient
        serializer = DossierPatientSerializer(dossier_patient)
        return Response(serializer.data, status=status.HTTP_200_OK)
class SoinParIndexAPIView(APIView):
    """
    API permettant de récupérer un soin spécifique d'un dossier patient en fonction de l'ordre d'apparition du soin.
    L'index commence à 1.
    """
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Récupère le soin spécifié par l'index dans la liste des soins associés au dossier patient.",
        manual_parameters=[
            openapi.Parameter(
                'dossier_patient_id', openapi.IN_QUERY, description="ID du dossier patient", type=openapi.TYPE_INTEGER, required=True
            ),
            openapi.Parameter(
                'index', openapi.IN_QUERY, description="Index du soin dans la liste des soins", type=openapi.TYPE_INTEGER, required=True
            ),
        ],
        responses={
            200: SoinSerializer(),
            400: "Les paramètres 'dossier_patient_id' et 'index' sont requis.",
            404: "Dossier patient ou soin non trouvé.",
        },
    )
    

    def get(self, request, *args, **kwargs):
        """
        Récupère le soin spécifié par l'index dans la liste des soins associés au dossier patient.
        """
        # Récupérer l'id du dossier patient et l'index du soin
        dossier_patient_id = request.query_params.get('dossier_patient_id')
        index = request.query_params.get('index')

        # Vérifier que l'id du dossier patient et l'index sont fournis
        if not dossier_patient_id or not index:
            return Response(
                {"detail": "Les paramètres 'dossier_patient_id' et 'index' sont requis."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Vérifier que l'index est un entier
        try:
            index = int(index)
        except ValueError:
            return Response(
                {"detail": "L'index doit être un nombre entier."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Vérifier que le dossier patient existe
        try:
            dossier_patient = DossierPatient.objects.get(id=dossier_patient_id)
        except DossierPatient.DoesNotExist:
            return Response(
                {"detail": "Dossier patient non trouvé."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Récupérer la liste des soins associés à ce dossier patient, ordonnée par la date du soin (ou selon un autre critère)
        soins = dossier_patient.soins.all().order_by('date_soin')

        # Vérifier que l'index est valide (dans les limites de la liste des soins)
        if index < 1 or index > len(soins):
            return Response(
                {"detail": f"Il n'y a pas de soin à l'index {index} pour ce dossier patient."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Récupérer le soin à l'index spécifié
        soin = soins[index - 1]  # L'index commence à 1, donc on soustrait 1 pour accéder à l'élément de la liste

        # Sérialiser le soin et renvoyer la réponse
        serializer = SoinSerializer(soin)
        return Response(serializer.data, status=status.HTTP_200_OK)