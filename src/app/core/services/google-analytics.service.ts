import { effect, inject, Injectable, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

declare let gtag: (command: string, targetId: string, config?: object) => void;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  isConsentAnswered = signal<boolean>(false);
  isConsentAccepted = signal<boolean>(false);
  router = inject(Router);
  cookieService = inject(CookieService);

  constructor() {
    effect(() => {
      if (this.isConsentAnswered() && this.isConsentAccepted()) {
        this.startTracking();
      }
    });
  }

  /**
   * Check if the user has answered the consent
   */
  checkIfConsentIsAnswered(): void {
    const consentCookie = this.cookieService.get('analyticsConsent');
    this.isConsentAnswered.set(!!consentCookie);
    this.isConsentAccepted.set(consentCookie === 'true');
  }

  /**
   * Starts tracking the user's navigation
   */
  startTracking(): void {
    this.cookieService.set('analyticsConsent', 'true', {
      path: '/',
      secure: true,
      sameSite: 'Lax',
    });
    this.loadAnalyticsScript();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', environment.G_TAG, {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }

  /**
   * Loads the Google Analytics script
   */
  loadAnalyticsScript(): void {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.G_TAG}`;
    document.head.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
    `;
    document.head.appendChild(inlineScript);
  }

  /**
   * Stops tracking the user's navigation
   */
  stopTracking(removeScript = false): void {
    this.cookieService.set('analyticsConsent', 'false', {
      path: '/',
      secure: true,
      sameSite: 'Lax',
    });
    if (removeScript) {
      const script = document.querySelector('script[src*="gtag/js"]');
      script && script.remove();
      const inlineScript = document.querySelector('script:not([src])');
      inlineScript && inlineScript.remove();
    }
    this.isConsentAccepted.set(false);
  }
}
