import { RenderMode, ServerRoute } from '@angular/ssr';
import { SanityService } from './core/services/sanity.service';
import { inject } from '@angular/core';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'offers',
    renderMode: RenderMode.Server,
  },
  {
    path: 'offer/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const offerIds = await fetchOfferIds();
      return offerIds.map(id => ({ id: id.toString() }));
    },
  },
  {
    path: 'privacy-policy',
    renderMode: RenderMode.Server,
  },
  {
    path: 'legal-notice',
    renderMode: RenderMode.Server,
  },
  {
    path: 'cookies',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];

async function fetchOfferIds(): Promise<string[]> {
  const sanityService = inject(SanityService);
  const data = await sanityService.getDataByType('offers', true);
  return data.offers.map((offer: { offerId: string }) => offer.offerId);
}
