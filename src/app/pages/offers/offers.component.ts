import { Component, computed, inject, linkedSignal } from '@angular/core';
import { SanityService } from '../../core/services/sanity.service';
import { Offer } from './interfaces/offer.interface';
import { RouterLink } from '@angular/router';
import { fadeInOutTrigger } from '../../shared/animations';
import { OfferDetailsComponent } from '../../shared/components/offer-details/offer-details.component';
import { ResponsiveService } from '../../core/services/responsive.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ac-offers',
  imports: [RouterLink, OfferDetailsComponent, NgClass],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css',
  animations: [fadeInOutTrigger],
})
export class OffersComponent {
  sanityService = inject(SanityService);
  offers = computed<Offer[]>(() => this.sanityService.data.value()?.offers);
  selectedOffer = linkedSignal<Offer>(() => this.offers()[0]);
  responsiveService = inject(ResponsiveService);
  isMobile = computed(() => this.responsiveService.isMobile());

  constructor() {
    this.sanityService.params.set({
      type: 'offers',
      singleton: true,
      filters: [],
    });
  }

  selectOffer(offer: Offer) {
    this.selectedOffer.set(offer);
  }
}
