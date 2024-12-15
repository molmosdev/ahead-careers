import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { SanityService } from '../../core/services/sanity.service';
import { Button, InViewportDirective } from '@realm-ui/angular';
import { RouterLink } from '@angular/router';
import { Offer } from '../offers/interfaces/offer.interface';
import { OfferDetailsComponent } from '../../shared/components/offer-details/offer-details.component';
import { RouteService } from '../../core/services/route.service';

@Component({
  selector: 'ac-offer',
  imports: [Button, RouterLink, OfferDetailsComponent, InViewportDirective],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css',
})
export class OfferComponent implements OnInit {
  @Input() id = '';
  routeService = inject(RouteService);
  sanityService = inject(SanityService);
  offer = computed<Offer>(() => {
    const offer: Offer = this.sanityService.data.value()?.offers[0];
    this.routeService.setMetaTagsForRoute({
      data: {
        title: offer.jobTitle,
        description: offer.location,
      },
    } as any);
    return offer;
  });

  ngOnInit(): void {
    this.sanityService.params.set({
      type: 'offers',
      singleton: true,
      filters: [{ name: 'offerId', value: this.id }],
    });
  }
}
