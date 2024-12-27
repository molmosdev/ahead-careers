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
    path: 'offer/:id',
    loadComponent: () =>
      import('./pages/offer/offer.component').then(m => m.OfferComponent),
    data: {
      title: 'Oferta Detallada - Ahead Careers',
      description: 'Detalles de la oferta laboral seleccionada.',
      keywords: 'oferta, trabajo, Ahead Careers, Eric Olmos',
    },
    title: 'Oferta Detallada - Ahead Careers',
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.component').then(
        m => m.PrivacyPolicyComponent
      ),
    data: {
      title: 'Política de Privacidad - Ahead Careers',
      description: 'Política de privacidad de Ahead Careers.',
      keywords: 'privacidad, Ahead Careers, Eric Olmos',
    },
    title: 'Política de Privacidad - Ahead Careers',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
