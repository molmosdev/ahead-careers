import { Component, inject, input } from '@angular/core';
import { Offer } from '../../../pages/offers/interfaces/offer.interface';
import { fadeInOutTrigger } from '../../animations';
import { DatePipe } from '@angular/common';
import { SanityService } from '../../../core/services/sanity.service';
import { Button } from '@realm-ui/angular';

@Component({
  selector: 'ac-offer-details',
  imports: [DatePipe, Button],
  templateUrl: './offer-details.component.html',
  styleUrl: './offer-details.component.css',
  animations: [fadeInOutTrigger],
})
export class OfferDetailsComponent {
  offer = input<Offer>();
  sanityService = inject(SanityService);

  /**
   * Gets the html from a block
   * @param block - The block to get the html from
   * @returns {string} - The html from the block
   */
  getHtmlFromBlock(block: any): string {
    return this.sanityService.transformBlockToHtml(block);
  }
}
