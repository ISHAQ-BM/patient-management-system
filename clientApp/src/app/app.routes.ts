import { Routes } from '@angular/router';
import { AuthComponent } from '../auth/presentation/auth.component';
import { authGuard } from './auth.guard';
import { DashboardComponent } from '../dashboard/presentation/dashboard.component';
import { DoctorComponent } from '../doctor/presentation/doctor.component';

export const routes: Routes = [
    { path: 'login', component: DoctorComponent },
  { path: 'dashboard',canActivate: [authGuard], component: DoctorComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];