import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    data: {
      title: 'Inicio - Ahead Careers',
      description: 'Bienvenido a Ahead Careers. Explora oportunidades laborales únicas.',
      keywords: 'carreras, oportunidades, trabajo, Ahead Careers, Eric Olmos',
    },
    title: 'Inicio',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
