import { Component, inject, model } from '@angular/core';
import { Button } from '@rem-ui/angular';
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
  googleAnalyticsService = inject(GoogleAnalyticsService);

  /**
   * Accept cookies and start tracking
   */
  acceptCookies(): void {
    this.googleAnalyticsService.startTracking();
    this.show.set(false);
  }

  /**
   * Reject cookies and stop tracking
   */
  rejectCookies(): void {
    this.googleAnalyticsService.stopTracking();
    this.show.set(false);
  }
}
