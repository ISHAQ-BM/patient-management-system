import { Routes } from '@angular/router';
import { AuthComponent } from '../auth/presentation/auth.component';
import { authGuard } from './auth.guard';
import { PatientsListComponent } from '../patients-list/presentation/patients-list.components';
import { PatientComponent } from '../patient/presentation/patient.component';

export const routes: Routes = [
    { path: 'login', component: AuthComponent },
    {
    path: 'patients',
    canActivate: [authGuard],
    component: PatientsListComponent,
    children: [
      { path: ':nss',canActivate: [authGuard], component: PatientComponent }, 
    ],
  },
  //{ path: 'dashboard',canActivate: [authGuard], component: DoctorComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];