import {
  Component,
  computed,
  inject,
  linkedSignal,
  OnInit,
  signal,
} from '@angular/core';
import { SanityService } from '../../core/services/sanity.service';
import { Offer } from './interfaces/offer.interface';
import { Router } from '@angular/router';
import { OfferDetailsComponent } from '../../shared/components/offer-details/offer-details.component';
import { ResponsiveService } from '../../core/services/responsive.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ac-offers',
  imports: [OfferDetailsComponent, NgClass],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css',
})
export class OffersComponent implements OnInit {
  router = inject(Router);
  sanityService = inject(SanityService);
  title = signal<string | undefined>(undefined);
  offers = signal<Offer[]>([]);
  formattedOffers = computed(() => {
    const offers = this.offers();
    return (
      offers &&
      offers
        .filter(offer => offer.isActive)
        .sort((a, b) => a.orderRank.localeCompare(b.orderRank))
    );
  });
  selectedOffer = linkedSignal<Offer>(() => this.formattedOffers()[0]);
  responsiveService = inject(ResponsiveService);
  isMobile = computed(() => this.responsiveService.isMobile());

  async ngOnInit() {
    this.title.set(await this.sanityService.getDataByType('offers', true, []));
    this.offers.set(await this.sanityService.getDataByType('offer', false, []));
  }

  selectOffer(offer: Offer) {
    if (this.isMobile()) {
      this.router.navigate(['/offer', offer.offerId]);
    } else {
      window.scrollTo(0, 0);
      this.selectedOffer.set(offer);
    }
  }
}
