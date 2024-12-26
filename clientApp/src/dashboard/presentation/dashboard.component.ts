import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  router=inject(Router)
  message: string = '';
  goToPatient(){
    this.router.navigate(['patient']);
  }

  // Méthode qui gère la sélection de l'élément
  selectElement(elementNumber: number) {
    this.message = `Bonjour, vous êtes dans l'élément ${elementNumber}`;
  }

  // Méthode pour le bouton "Settings"
  goToSettings() {
    alert('Settings clicked');
  }

  // Méthode pour le bouton "Logout"
  logout() {
    alert('Logout clicked');
  }
}
