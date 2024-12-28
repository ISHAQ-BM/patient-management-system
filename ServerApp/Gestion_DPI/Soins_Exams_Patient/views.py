from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from Med_Patient.models import DossierPatient, Patient
from Med_Patient.serializers import DossierPatientSerializer
from authentification.models import User
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
# Create your views here.
