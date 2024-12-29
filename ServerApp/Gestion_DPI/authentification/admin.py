from django.contrib import admin
from .models import User
from Med_Patient.models import Medecin,Medicament,MedicamentOrdonnance,User,Patient,PersonnelAdministratif,DossierPatient
from Soins_Exams_Patient.models import Infirmier,Soin

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'date_joined')
    search_fields = ('username', 'email')

# Register your models here.
admin.site.register(MedicamentOrdonnance)
admin.site.register(Medecin)
admin.site.register(Medicament)
admin.site.register(Patient)
admin.site.register(PersonnelAdministratif)   
admin.site.register(DossierPatient)
admin.site.register(Infirmier)
admin.site.register(Soin)