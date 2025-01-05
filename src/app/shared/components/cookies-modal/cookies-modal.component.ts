import { Component, inject, model, OnInit } from '@angular/core';
import { Button } from '@realm-ui/angular';
import { GoogleAnalyticsService } from '../../../core/services/google-analytics.service';

@Component({
  selector: 'ac-cookies-modal',
  imports: [Button],
  templateUrl: './cookies-modal.component.html',
  styleUrl: './cookies-modal.component.css',
})
export class CookiesModalComponent implements OnInit {
  show = model<boolean>(true);
  analyticsService = inject(GoogleAnalyticsService);

  ngOnInit(): void {
    this.checkConsent();
  }

  /**
   * Check if the user has already given consent to use cookies
   */
  checkConsent(): void {
    const consent = localStorage.getItem('analyticsConsent');
    if (consent === 'true') {
      this.analyticsService.startTracking();
      this.show.set(false);
    } else if (consent === 'false') {
      this.show.set(false);
    }
  }

  /**
   * Accept cookies and start tracking
   */
  acceptCookies(): void {
    localStorage.setItem('analyticsConsent', 'true');
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
