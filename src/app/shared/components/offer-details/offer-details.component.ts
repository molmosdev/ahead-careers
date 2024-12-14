import { Component, input } from '@angular/core';
import { Offer } from '../../../pages/offers/interfaces/offer.interface';
import { JsonPipe } from '@angular/common';
import { fadeInOutTrigger } from '../../animations';

@Component({
  selector: 'ac-offer-details',
  imports: [JsonPipe],
  templateUrl: './offer-details.component.html',
  styleUrl: './offer-details.component.css',
  animations: [fadeInOutTrigger],
})
export class OfferDetailsComponent {
  offer = input<Offer>();
}
