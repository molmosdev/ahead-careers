import { NgClass } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { SanityService } from '../../core/services/sanity.service';
import { ResponsiveService } from '../../core/services/responsive.service';
import { TitleAndContent } from '../../shared/interfaces/title-and-content';
import { GoogleAnalyticsService } from '../../core/services/google-analytics.service';
import { Button } from '@realm-ui/angular';

@Component({
  selector: 'ac-cookies',
  imports: [NgClass, Button],
  templateUrl: './cookies.component.html',
  styleUrl: './cookies.component.css',
})
export class CookiesComponent implements OnInit {
  sanityService = inject(SanityService);
  cookies = computed<TitleAndContent>(() => {
    const data = this.sanityService.data.value();
    return {
      ...data,
      content: this.sanityService.transformBlockToHtml(data?.content),
    };
  });
  responsiveService = inject(ResponsiveService);
  isMobile = computed(() => this.responsiveService.isMobile());
  googleAnalyticsService = inject(GoogleAnalyticsService);
  isConsentAnswered = computed(() =>
    this.googleAnalyticsService.isConsentAnswered()
  );
  isConsentAccepted = computed(() =>
    this.googleAnalyticsService.isConsentAccepted()
  );

  ngOnInit(): void {
    this.sanityService.params.set({
      type: 'cookies',
      singleton: true,
      filters: [],
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
