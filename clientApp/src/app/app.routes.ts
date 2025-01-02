import { Routes } from '@angular/router';
import { AuthComponent } from '../auth/presentation/auth.component';
import { authGuard } from './auth.guard';
import { PatientsListComponent } from '../patients-list/presentation/patients-list.components';
import { PatientComponent } from '../patient/presentation/patient.component';
import { CreateDPiComponent } from '../administratif/presentation/create-dpi/create-dpi.component';
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
  {
    path: 'create-dpi',
    canActivate: [authGuard],
    component: CreateDPiComponent,
  },
  {
    path: 'patient',
    canActivate: [authGuard],
    component: PatientComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];