import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CreateDPIUseCase } from "../../domain/usecase/create-dpi.usecase";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'create-dpi',
  templateUrl: './create-dpi.component.html',
  styleUrl: './create-dpi.component.css',
  imports:[ReactiveFormsModule, 
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatProgressSpinnerModule,
      CommonModule]
  
})

export class CreateDPiComponent{
    
    private snackBar = inject(MatSnackBar);  
    private createDPIUseCase = inject(CreateDPIUseCase); 
    isLoading = false;
    
       dpiForm: FormGroup;


        constructor(private fb: FormBuilder) {
    
    this.dpiForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birth_day: ['', Validators.required],
      adresse: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      social_security_number: ['', Validators.required],
      mutual: ['', Validators.required],
      contact_person: ['', Validators.required],
      contact_person_phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


       


 async onSubmit() {
  if (this.dpiForm.invalid) {
    this.showToast('Please fill out all required fields correctly.', 'error');
    return;
  }

  const {
    username,
    email,
    password,
    first_name,
    last_name,
    social_security_number: numero_securite_sociale,
    birth_day: date_naissance,
    adresse,
    phone: telephone,
    mutual: mutuelle,
    contact_person: personne_contact_nom,
    contact_person_phone: personne_contact_telephone,
  } = this.dpiForm.value;

  const params = {
    user: {
      username,
      email,
      password,
      first_name,
      last_name,
    },
    patient: {
      numero_securite_sociale,
      date_naissance,
      adresse,
      telephone,
      mutuelle,
      personne_contact_nom,
      personne_contact_telephone,
      
    },
  };

  console.log(params)

  this.isLoading = true;

  try {
    const result = await this.createDPIUseCase.execute(params);

    if (result) {
      this.showToast('DPI created successfully!', 'success');
      this.dpiForm.reset(); // Reset the form after successful submission
    } else {
      this.showToast('Failed to create DPI. Please try again.', 'error');
    }
  } catch (error) {
    console.error('Error creating DPI:', error);
    this.showToast('An error occurred. Please try again later.', 'error');
  } finally {
    this.isLoading = false;
  }
}

  

   showToast(message: string, type: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }

}