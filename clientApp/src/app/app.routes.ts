import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'patient',
    loadComponent: async () => {
      const m = await import('../patients/presentation/patients.component');
      return m.PatientsComponent;
    },
  },
  {
    path: '',
    loadComponent: async () => {
      const m = await import('../dashboard/presentation/dashboard.component');
      return m.DashboardComponent;
    },
  },
];
