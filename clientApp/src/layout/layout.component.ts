import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { LogoutUseCase } from '../auth/domain/usecase/lougout.usecase';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [MatIconModule,MatToolbarModule,RouterModule,CommonModule,MatMenuModule],
})
export class LayoutComponent {

  private logoutUseCase = inject(LogoutUseCase); 
  private snackBar = inject(MatSnackBar); 

  username :string | null= null;

  role :string |null = null;

  ngOnInit( ): void {
    this.username = localStorage.getItem('username');
    this.role = localStorage.getItem('role');
    this.role = this.role === 'P' ? 'Patient' : this.role === 'M' ? 'Médecin' : this.role === 'PA' ? 'Personnel Administratif' : this.role === 'PH' ? 'Pharmacien' : this.role === 'I' ? 'Infirmier' : 'Laborantin/Radiologue';
  }
  
   async logout() {
    try {
      await this.logoutUseCase.execute(); 
      window.location.reload(); 
    } catch (error) {
      this.snackBar.open('Failed to log out. Please try again.', 'Close', {
        duration: 3000, 
        panelClass: ['error-snackbar'] 
      });
    }
  }
}
