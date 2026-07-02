import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Gowri Prasath Babu | Senior Full Stack Engineer',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
