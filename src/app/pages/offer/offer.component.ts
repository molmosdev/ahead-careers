import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { SanityService } from '../../core/services/sanity.service';
import { Button, InViewportDirective } from '@realm-ui/angular';
import { RouterLink } from '@angular/router';
import { Offer } from '../offers/interfaces/offer.interface';
import { OfferDetailsComponent } from '../../shared/components/offer-details/offer-details.component';

@Component({
  selector: 'ac-offer',
  imports: [Button, RouterLink, OfferDetailsComponent, InViewportDirective],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css',
})
export class OfferComponent implements OnInit {
  @Input() id = '';
  sanityService = inject(SanityService);
  offer = computed<Offer>(() => this.sanityService.data.value()?.offers[0]);

  ngOnInit(): void {
    this.sanityService.params.set({
      type: 'offers',
      singleton: true,
      filters: [{ name: 'offerId', value: this.id }],
    });
  }
}
