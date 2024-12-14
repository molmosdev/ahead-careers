import { Component, input } from '@angular/core';
import { Offer } from '../../../pages/offers/interfaces/offer.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'ac-offer-details',
  imports: [JsonPipe],
  templateUrl: './offer-details.component.html',
  styleUrl: './offer-details.component.css',
})
export class OfferDetailsComponent {
  offer = input<Offer>();
}
