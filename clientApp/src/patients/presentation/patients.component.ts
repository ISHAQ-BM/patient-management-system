
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent {
    
  // Définir un utilisateur pour afficher ses informations
  user = {
    name: 'Yessad Lamia',
    role: 'Admin',
  };

  // Liste des patients
  patients = [
    {
      photo: 'https://via.placeholder.com/40',
      name: 'Elizabeth Polson',
      age: 32,
      gender: 'Femme',
      blood: 'B+',
      email: 'elsabethpolsanhotmail.com',
    },
    {
      photo: 'https://via.placeholder.com/40',
      name: 'John David',
      age: 28,
      gender: 'Homme',
      blood: 'B+',
      email: 'davidjohn22gmail.com',
    },
    // Ajoute d'autres patients ici
  ];

  // Texte de recherche
  searchText: string = '';

  // Filtrer les patients en fonction de la recherche
  get filteredPatients() {
    return this.patients.filter((patient) =>
      patient.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Méthode pour supprimer un patient
  deletePatient(patient: any) {
    this.patients = this.patients.filter((p) => p !== patient);
  }

  // Méthode pour approuver un patient (exemple)
  approvePatient(patient: any) {
    console.log(`Patient approuvé: ${patient.name}`);
  }

  // Fonction de recherche de patient
  searchPatient() {
    console.log('Recherche de patient:', this.searchText);
  }

  // Fonction de recherche QR
  qrSearch() {
    console.log('Recherche QR');
  }
}
