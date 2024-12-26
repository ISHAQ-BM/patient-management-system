
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
})
export class PatientsComponent {
    router = inject(Router)
  // Définir un utilisateur pour afficher ses informations
  user = {
    name: 'Yessad Lamia',
    role: 'Admin',
  };

  
}