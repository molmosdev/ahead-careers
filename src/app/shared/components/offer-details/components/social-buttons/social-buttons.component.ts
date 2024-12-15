import { Component, computed, input } from '@angular/core';
import { Button } from '@realm-ui/angular';

@Component({
  selector: 'ac-social-buttons',
  imports: [Button],
  templateUrl: './social-buttons.component.html',
  styleUrl: './social-buttons.component.css',
})
export class SocialButtonsComponent {
  offerId = input.required<number>();
  shareUrl = computed(
    () => `https://beta.aheadcareers.com/offer/${this.offerId()}`
  );

  /**
   * Share the offer on LinkedIn
   */
  shareOnLinkedIn(): void {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(this.shareUrl())}`;
    window.open(url, '_blank');
  }

  /**
   * Share the offer on WhatsApp
   */
  shareOnWhatsApp(): void {
    const url = `https://wa.me/?text=${encodeURIComponent(this.shareUrl())}`;
    window.open(url, '_blank');
  }

  /**
   * Copy the offer URL to the clipboard
   */
  copyToClipboard(): void {
    navigator.clipboard.writeText(this.shareUrl());
  }
}
