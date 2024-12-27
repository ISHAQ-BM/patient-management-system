import { Routes } from '@angular/router';
import { AuthComponent } from '../auth/presentation/auth.component';
import { authGuard } from './auth.guard';
import { PatientsList } from '../base/presentation/patients-list/patients-list.components';

export const routes: Routes = [
    { path: 'login', component: AuthComponent },
  { path: 'dashboard',canActivate: [authGuard], component: PatientsList },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
