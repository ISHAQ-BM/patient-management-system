import { AfterViewInit, Component, inject, Sanitizer, ViewChild } from "@angular/core";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {  MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SearchDPIUseCase } from "../domain/usecase/searchDPIByNSS.usecase";
import { MatSnackBar } from "@angular/material/snack-bar";
import jsQR from 'jsqr';
import {  GetPatientsListUseCase } from "../domain/usecase/getPatientList.usecase";



export interface PeriodicElement {
  patientName: string;
  nss: string;
  phoneNumber:string;
  email:String

}

const ELEMENT_DATA: PeriodicElement[] = [
  {patientName: 'test test', nss: '40',phoneNumber: '123456789',email: 'test@test.com'},
  {patientName: 'test test', nss: '40',phoneNumber: '123456789',email: 'test@test.com'},
  {patientName: 'test test', nss: '40',phoneNumber: '123456789',email: 'test@test.com'},
  {patientName: 'test test', nss: '40',phoneNumber: '123456789',email: 'test@test.com'},
  {patientName: 'test test', nss: '40',phoneNumber: '123456789',email: 'test@test.com'},
  {patientName: 'test test', nss: '40',phoneNumber: '123456789',email: 'test@test.com'},
  {patientName: 'test test', nss: '40',phoneNumber: '123456789',email: 'test@test.com'},
  {patientName: 'test test', nss: '40',phoneNumber: '123456789',email: 'test@test.com'},
  {patientName: 'test test', nss: '40',phoneNumber: '123456789',email: 'test@test.com'},
  {patientName: 'test test', nss: '40',phoneNumber: '123456789',email: 'test@test.com'},
  {patientName: 'test test', nss: '40',phoneNumber: '123456789',email: 'test@test.com'},
  {patientName: 'test test', nss: '40',phoneNumber: '123456789',email: 'test@test.com'},
  {patientName: 'test test', nss: '40',phoneNumber: '123456789',email: 'test@test.com'},
  {patientName: 'test test', nss: '40',phoneNumber: '123456789',email: 'test@test.com'},
];

@Component({
  selector: 'patients-list',
  templateUrl: './patients-list.component.html',
  styleUrl: './patients-list.component.css',
  imports:[ReactiveFormsModule,MatTableModule,MatFormFieldModule, MatInputModule, MatIconModule,MatPaginatorModule,FormsModule]
  
})

export class PatientsListComponent implements AfterViewInit{


  decodedString: string | null = null;

  
        private searchDPIUseCase = inject(SearchDPIUseCase); 
        private getPatientUseCase = inject(GetPatientsListUseCase); 

    displayedColumns: string[] = ['patientName', 'nss','phoneNumber','email'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

   @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    private snackBar = inject(MatSnackBar); 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getPatients()
  }
  searchControl = new FormControl('');

  
   onRowClicked(row: any) {
    console.log('Row clicked: ', row);
    // Add navigation or other actions here
  }

  async onSearch(query:string | null) {
  try {
    const searchQuery = query || this.searchControl.value;
    const result = await this.searchDPIUseCase.execute(searchQuery);
    console.log(result);

    if (result) {
      const element = this.transformResultToElement(result);
      this.dataSource.data = [element];
    } else {
      this.showToast('No results found.', 'error');
    }
  } catch (error: any) {
    this.showToast(error.message || 'An error occurred while searching.', 'error');
  }
}



 async getPatients(): Promise<void> {
    try {
      const patients = await this.getPatientUseCase.execute();
      this.dataSource.data = patients.map(this.transformResultToElement);
    } catch (error: any) {
      this.showToast(error, 'error');
    }
  }


onFileUpload(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0, img.width, img.height);

         
          try {
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
              this.decodedString = code.data; 
              this.onSearch(this.decodedString) 
            } else {
              this.decodedString = 'No QR code found';
            }
          } catch (error) {
            console.error('Error while processing the image data:', error);
            this.decodedString = 'Error processing QR code';
          }
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file); 
  }
}


  private transformResultToElement(result: any): PeriodicElement {
  return {
    patientName: 'patient name',
    nss: result.nss, 
    phoneNumber: result.telephone,
    email: result.email, 
  };
}



showToast(message: string, type: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }


  private calculateAge(dateOfBirth: string): number {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

}


