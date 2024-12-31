import { AfterViewInit, Component, inject, Sanitizer, ViewChild } from "@angular/core";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SearchDPIUseCase } from "../domain/usecase/searchDPIByNSS.usecase";
import { MatSnackBar } from "@angular/material/snack-bar";


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

  async onSearch() {
  try {
    const result = await this.searchDPIUseCase.execute(this.searchControl.value);
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

