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



export interface PeriodicElement {
  patientName: string;
  age: string;
  gender: string;
  bloodGroup: string;
  phoneNumber:string;
  emailID:String

}

const ELEMENT_DATA: PeriodicElement[] = [
  {patientName: 'test test', age: '40', gender: 'male', bloodGroup: 'A+',phoneNumber: '123456789',emailID: 'test@test.com'},
  {patientName: 'test test', age: '40', gender: 'male', bloodGroup: 'A+',phoneNumber: '123456789',emailID: 'test@test.com'},
  {patientName: 'test test', age: '40', gender: 'male', bloodGroup: 'A+',phoneNumber: '123456789',emailID: 'test@test.com'},
  {patientName: 'test test', age: '40', gender: 'male', bloodGroup: 'A+',phoneNumber: '123456789',emailID: 'test@test.com'},
  {patientName: 'test test', age: '40', gender: 'male', bloodGroup: 'A+',phoneNumber: '123456789',emailID: 'test@test.com'},
  {patientName: 'test test', age: '40', gender: 'male', bloodGroup: 'A+',phoneNumber: '123456789',emailID: 'test@test.com'},
  {patientName: 'test test', age: '40', gender: 'male', bloodGroup: 'A+',phoneNumber: '123456789',emailID: 'test@test.com'},
  {patientName: 'test test', age: '40', gender: 'male', bloodGroup: 'A+',phoneNumber: '123456789',emailID: 'test@test.com'},
  {patientName: 'test test', age: '40', gender: 'male', bloodGroup: 'A+',phoneNumber: '123456789',emailID: 'test@test.com'},
  {patientName: 'test test', age: '40', gender: 'male', bloodGroup: 'A+',phoneNumber: '123456789',emailID: 'test@test.com'},
  {patientName: 'test test', age: '40', gender: 'male', bloodGroup: 'A+',phoneNumber: '123456789',emailID: 'test@test.com'},
  {patientName: 'test test', age: '40', gender: 'male', bloodGroup: 'A+',phoneNumber: '123456789',emailID: 'test@test.com'},
  {patientName: 'test test', age: '40', gender: 'male', bloodGroup: 'A+',phoneNumber: '123456789',emailID: 'test@test.com'},
  {patientName: 'test test', age: '40', gender: 'male', bloodGroup: 'A+',phoneNumber: '123456789',emailID: 'test@test.com'},
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

    displayedColumns: string[] = ['patientName', 'age', 'gender', 'bloodGroup','phoneNumber','emailID'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

   @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    private snackBar = inject(MatSnackBar); 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
    patientName: `${result.patient_info.nom} ${result.patient_info.prenom}`,
    age: this.calculateAge(result.patient_info.date_naissance).toString(),
    gender: result.gender || 'N/A',
    bloodGroup: result.bloodGroup || 'N/A', 
    phoneNumber: result.patient_info.telephone,
    emailID: result.patient_info.medecin_traitant.split(' - ')[0], 
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


