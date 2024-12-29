from django.db import models
from authentification.models import User

class Infirmier(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="infirmier")
    telephone = models.CharField(max_length=15)

    def __str__(self):
        return f"Infirmier: {self.user.get_full_name()}"

class Pharmacien(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="pharmacien")
    telephone = models.CharField(max_length=15)

    def __str__(self):
        return f"Pharmacien: {self.user.get_full_name()}"

class LaborantainRadiologue(models.Model):
    ROLE_CHOICES = [
        ('Laborantain', 'Laborantain'),
        ('Radiologue', 'Radiologue'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="laborantain_radiologue")
    telephone = models.CharField(max_length=15)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.role}: {self.user.get_full_name()}"
<<<<<<< HEAD

=======
>>>>>>> 1c8873573cd4cda33ec147f54291f6b528e2c5f1
class Soin(models.Model):
    
    dossier_patient = models.ForeignKey('Med_Patient.DossierPatient', on_delete=models.CASCADE, related_name="soins")
    infirmier = models.ForeignKey(Infirmier, on_delete=models.CASCADE, related_name="soins", null=True, blank=True)
    date_soin = models.DateField()
    description = models.TextField(null=True, blank=True)
    observation = models.TextField(null=True, blank=True)
    def __str__(self):
        return f"Soin de {self.dossier_patient} - {self.date_soin}"
<<<<<<< HEAD

=======
>>>>>>> 1c8873573cd4cda33ec147f54291f6b528e2c5f1
