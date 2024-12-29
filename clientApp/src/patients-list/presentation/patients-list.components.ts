import { AfterViewInit, Component, inject, Sanitizer, ViewChild } from "@angular/core";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SearchDPIUseCase } from "../domain/usecase/searchDPIByNSS.usecase";


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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  searchControl = new FormControl('');

  onSearch() {
    this.searchDPIUseCase.execute(this.searchControl.value)
  }
}