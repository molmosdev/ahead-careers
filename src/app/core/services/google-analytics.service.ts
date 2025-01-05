import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../../../environments/environment';

declare let gtag: (command: string, targetId: string, config?: object) => void;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor(private router: Router) {}

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
   * Starts tracking the user's navigation
   */
  startTracking(): void {
    this.loadAnalyticsScript();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', environment.G_TAG, {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }
}
