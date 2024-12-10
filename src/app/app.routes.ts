import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
    data: {
      title: 'Inicio - Ahead Careers',
      description:
        'Bienvenido a Ahead Careers. Explora oportunidades laborales únicas.',
      keywords: 'carreras, oportunidades, trabajo, Ahead Careers, Eric Olmos',
    },
    title: 'Inicio - Ahead Careers',
  },
  {
    path: 'offers',
    loadComponent: () =>
      import('./pages/offers/offers.component').then(m => m.OffersComponent),
    data: {
      title: 'Ofertas - Ahead Careers',
      description: 'Explora nuestras ofertas laborales disponibles.',
      keywords: 'ofertas, trabajo, Ahead Careers, Eric Olmos',
    },
    title: 'Ofertas - Ahead Careers',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
