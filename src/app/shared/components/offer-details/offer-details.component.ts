import { Component, computed, inject, input, signal } from '@angular/core';
import { Offer } from '../../../pages/offers/interfaces/offer.interface';
import { DatePipe } from '@angular/common';
import { SanityService } from '../../../core/services/sanity.service';
import { Button, Dialog, LazyContentDirective } from '@rem-ui/angular';
import { SocialButtonsComponent } from './components/social-buttons/social-buttons.component';
import { ResponsiveService } from '../../../core/services/responsive.service';
import { ApplyModalComponent } from './components/apply-modal/apply-modal.component';
import { ContactUsModalService } from '../../../core/services/contact-us-modal.service';

@Component({
  selector: 'ac-offer-details',
  imports: [
    DatePipe,
    Button,
    SocialButtonsComponent,
    Dialog,
    ApplyModalComponent,
    LazyContentDirective,
  ],
  templateUrl: './offer-details.component.html',
  styleUrl: './offer-details.component.css',
})
export class OfferDetailsComponent {
  offer = input.required<Offer>();
  sanityService = inject(SanityService);
  responsiveService = inject(ResponsiveService);
  isMobile = computed(() => this.responsiveService.isMobile());
  isApplyModalOpen = signal<boolean>(false);
  contactUsModalService = inject(ContactUsModalService);

  /**
   * Gets the html from a block
   * @param block - The block to get the html from
   * @returns {string} - The html from the block
   */
  getHtmlFromBlock(block: any): string {
    return this.sanityService.transformBlockToHtml(block);
  }
}
