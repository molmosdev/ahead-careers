import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
    data: {
      title: 'Ahead Careers',
      description:
        'Ahead Careers conecta empresas con el mejor talento y acompaña a profesionales en su próximo reto laboral, ofreciendo asesoramiento personalizado.',
      keywords:
        'carreras, oportunidades, trabajo, Ahead Careers, Eric Olmos, consultoría, selección de personal, selección, talento',
    },
    title: 'Ahead Careers',
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
    path: 'legal-notice',
    loadComponent: () =>
      import('./pages/legal-notice/legal-notice.component').then(
        m => m.LegalNoticeComponent
      ),
    data: {
      title: 'Aviso Legal - Ahead Careers',
      description: 'Información sobre el aviso legal de Ahead Careers.',
      keywords: 'aviso legal, Ahead Careers, Eric Olmos',
    },
    title: 'Aviso Legal - Ahead Careers',
  },
  {
    path: 'cookies',
    loadComponent: () =>
      import('./pages/cookies/cookies.component').then(m => m.CookiesComponent),
    data: {
      title: 'Política de Cookies - Ahead Careers',
      description: 'Información sobre la política de cookies de Ahead Careers.',
      keywords: 'cookies, política de cookies, Ahead Careers, Eric Olmos',
    },
    title: 'Política de Cookies - Ahead Careers',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
