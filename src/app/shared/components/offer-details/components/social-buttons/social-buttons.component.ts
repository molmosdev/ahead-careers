import { Component, computed, input, signal } from '@angular/core';
import { Button, Dialog } from '@rem-ui/angular';
import { Offer } from '../../../../../pages/offers/interfaces/offer.interface';

@Component({
  selector: 'ac-social-buttons',
  imports: [Button, Dialog],
  templateUrl: './social-buttons.component.html',
  styleUrl: './social-buttons.component.css',
})
export class SocialButtonsComponent {
  isDialogVisible = signal<boolean>(false);
  offer = input.required<Offer>();
  offerJobTitle = computed(() => this.offer().jobTitle);
  offerId = computed(() => this.offer().offerId);
  shareUrl = computed(() => `https://aheadcareers.com/offer/${this.offerId()}`);

  /**
   * Share the offer on LinkedIn
   */
  shareOnLinkedIn(): void {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(this.shareUrl())}`;
    window.open(url, '_blank');
    this.isDialogVisible.set(false);
  }

  /**
   * Share the offer on WhatsApp
   */
  shareOnWhatsApp(): void {
    const url = `https://wa.me/?text=${encodeURIComponent(this.shareUrl())}`;
    window.open(url, '_blank');
    this.isDialogVisible.set(false);
  }

  /**
   * Copy the offer URL to the clipboard
   */
  copyToClipboard(): void {
    navigator.clipboard.writeText(this.shareUrl());
    this.isDialogVisible.set(false);
  }
}
