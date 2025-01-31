import { RenderMode, ServerRoute } from '@angular/ssr';
import { SanityService } from './core/services/sanity.service';
import { inject } from '@angular/core';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'offers',
    renderMode: RenderMode.Prerender,
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
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [{ _blank: 'true' }];
    },
  },
  {
    path: 'legal-notice',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'cookies',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];

async function fetchOfferIds(): Promise<string[]> {
  const sanityService = inject(SanityService);
  const data = await sanityService.getDataByType('offer', false, []);
  return data.offers.map((offer: { offerId: string }) => offer.offerId);
}
