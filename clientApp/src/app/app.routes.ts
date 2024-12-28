import { Routes } from '@angular/router';
import { AuthComponent } from '../auth/presentation/auth.component';
import { authGuard } from './auth.guard';
import { DashboardComponent } from '../dashboard/presentation/dashboard.component';

export const routes: Routes = [
    { path: 'login', component: AuthComponent },
  { path: 'dashboard',canActivate: [authGuard], component: DashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];