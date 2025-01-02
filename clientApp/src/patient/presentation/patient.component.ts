import { Component, inject } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GetDPIUseCase } from "../domain/usecase/getDpi.usecase";
import { DPIResponse } from "../data/entities/dpi-response.entity";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css',
  imports:[
    
        MatIconModule,
        MatCardModule,
        CommonModule
  ]
  
})
export class PatientComponent {
     
private snackBar = inject(MatSnackBar); 
      private getDpiUseCase = inject(GetDPIUseCase); 

  
       dpiData: DPIResponse  = {
         numero_securite_sociale: "",
         nom: "",
         prenom: "",
         date_naissance: "",
         adresse: "",
         telephone: "",
         mutuelle: "",
         medecin_traitant_nom: "",
         personne_contact_nom: "",
         personne_contact_telephone: "",
         dossier: {
           date_derniere_mise_a_jour: "",
           antecedents: "",
           consultations: []
         }
       };

  

   async ngOnInit() {
    const result = await this.getDpiUseCase.execute();
    console.log(result);
    if (result) {
      this.dpiData=result
      this.showToast('success', 'error');
    } else {
      this.showToast('error.', 'error');
    }
  }
  
  
   showToast(message: string, type: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }

}

