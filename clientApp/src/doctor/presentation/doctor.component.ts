import { Component, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from "@angular/common";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PatientsListComponent } from "../../patients-list/presentation/patients-list.components";

@Component({
  selector: 'doctor',
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css',
  imports:[ReactiveFormsModule, 
    PatientsListComponent,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule]
  
})
export class DoctorComponent {
       

}