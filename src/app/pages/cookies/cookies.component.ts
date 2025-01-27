import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SanityService } from '../../core/services/sanity.service';
import { ResponsiveService } from '../../core/services/responsive.service';
import { TitleAndContent } from '../../shared/interfaces/title-and-content';
import { GoogleAnalyticsService } from '../../core/services/google-analytics.service';
import { Button } from '@rem-ui/angular';

@Component({
  selector: 'ac-cookies',
  imports: [Button],
  templateUrl: './cookies.component.html',
  styleUrl: './cookies.component.css',
})
export class CookiesComponent implements OnInit {
  sanityService = inject(SanityService);
  cookies = signal<TitleAndContent | undefined>(undefined);
  responsiveService = inject(ResponsiveService);
  isMobile = computed(() => this.responsiveService.isMobile());
  googleAnalyticsService = inject(GoogleAnalyticsService);
  isConsentAnswered = computed(() =>
    this.googleAnalyticsService.isConsentAnswered()
  );
  isConsentAccepted = computed(() =>
    this.googleAnalyticsService.isConsentAccepted()
  );

  async ngOnInit(): Promise<void> {
    const data = await this.sanityService.getDataByType('cookies', true);
    this.cookies.set({
      ...data,
      content: this.sanityService.transformBlockToHtml(data?.content),
    });
  }

  /**
   * Decline cookies and stop tracking
   */
  declineCookies(): void {
    this.googleAnalyticsService.stopTracking();
  }

  /**
   * Accept cookies and start tracking
   */
  acceptCookies(): void {
    this.googleAnalyticsService.isConsentAccepted.set(true);
  }
}
