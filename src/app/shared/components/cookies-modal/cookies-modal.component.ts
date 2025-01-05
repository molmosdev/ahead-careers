import { Component, inject, model } from '@angular/core';
import { Button } from '@realm-ui/angular';
import { GoogleAnalyticsService } from '../../../core/services/google-analytics.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ac-cookies-modal',
  imports: [Button, RouterLink],
  templateUrl: './cookies-modal.component.html',
  styleUrl: './cookies-modal.component.css',
})
export class CookiesModalComponent {
  show = model<boolean>(false);
  analyticsService = inject(GoogleAnalyticsService);

  /**
   * Accept cookies and start tracking
   */
  acceptCookies(): void {
    this.analyticsService.startTracking();
    this.show.set(false);
  }

  /**
   * Reject cookies and stop tracking
   */
  rejectCookies(): void {
    localStorage.setItem('analyticsConsent', 'false');
    this.show.set(false);
  }
}
