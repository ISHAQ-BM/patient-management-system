import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CreateDPIUseCase } from "../../domain/usecase/create-dpi.usecase";

@Component({
  selector: 'create-dpi',
  templateUrl: './create-dpi.component.html',
  styleUrl: './create-dpi.component.css',
  imports:[ReactiveFormsModule, 
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      CommonModule]
  
})

export class CreateDPiComponent{
    
    private snackBar = inject(MatSnackBar);  
    private createDPIUseCase = inject(CreateDPIUseCase); 
    
       authForm: FormGroup;
       constructor(private fb: FormBuilder) { 
           this.authForm = this.fb.group({
             email: [''],
             password: [''],
             username: [''],
             first_name: [''],
              last_name: [''],
             numero_securite_sociale: [''],
             date_naissance: [''],
             adresse: [''],
              telephone: [''],
             personne_contact_nom: [''],
             personne_contact_telephone: [''],
             mutuelle: [''],
           });
          }


       


  async onSubmit() {


    const params = {
  user: {
    username: "testteetst",
    email: "dpi@gmail.com",
    password: "password000",
    first_name: "string",
    last_name: "string"
  },
  patient: {
    numero_securite_sociale: "123451000000313",
    date_naissance: "2024-12-27",
    adresse: "string",
    telephone: "1234567890",
    mutuelle: "string",
    personne_contact_nom: "1234567899",
    personne_contact_telephone: "1234567897",
    medcin_traitant:"seife"
  }
};
      
    const result = await this.createDPIUseCase.execute(params);
    
    if (result) {
      this.showToast('success', 'success');
    } else {
      this.showToast('Error', 'error');
    }
    }
  

   showToast(message: string, type: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }

}