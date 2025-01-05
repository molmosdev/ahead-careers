import { effect, inject, Injectable, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../../../environments/environment';

declare let gtag: (command: string, targetId: string, config?: object) => void;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  isConsentAnswered = signal<boolean>(false);
  isConsentAccepted = signal<boolean>(false);
  router = inject(Router);

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
    this.isConsentAnswered.set(!!localStorage.getItem('analyticsConsent'));
    this.isConsentAccepted.set(
      localStorage.getItem('analyticsConsent') === 'true'
    );
  }

  /**
   * Starts tracking the user's navigation
   */
  startTracking(): void {
    localStorage.setItem('analyticsConsent', 'true');
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
    // Add the script to the document
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.G_TAG}`;
    document.head.appendChild(script);

    // Add the inline script to the document
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
  stopTracking(): void {
    localStorage.setItem('analyticsConsent', 'false');
    // Remove the script from the document
    const script = document.querySelector('script[src*="gtag/js"]');
    script && script.remove();
    // Remove the inline script from the document
    const inlineScript = document.querySelector('script:not([src])');
    inlineScript && inlineScript.remove();
    this.isConsentAccepted.set(false);
  }
}
