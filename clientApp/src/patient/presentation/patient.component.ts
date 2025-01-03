import { Component, inject, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GetDPIUseCase } from "../domain/usecase/getDpi.usecase";
import { DPIResponse } from "../data/entities/dpi-response.entity";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  imports: [
    MatIconModule,
    MatCardModule,
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class PatientComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private getDpiUseCase = inject(GetDPIUseCase);

  dpiData: DPIResponse | null = null; 

  isLoading = true;

async ngOnInit() {
  try {
    const result = await this.getDpiUseCase.execute();
    if (result) {
      this.dpiData = result[0];
      this.showToast('DPI data fetched successfully', 'success');
      console.log('dpi',this.dpiData)
    } else {
      this.showToast('No DPI data found.', 'error');
    }
  } catch (error) {
    console.error('Error fetching DPI data:', error);
    this.showToast('An error occurred while fetching DPI data.', 'error');
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
