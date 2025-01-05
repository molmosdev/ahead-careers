import { inject, Injectable, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';
import { filter } from 'rxjs';
import { GoogleAnalyticsService } from './google-analytics.service';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  router = inject(Router);
  route = inject(ActivatedRoute);
  projectTitle = inject(Title);
  meta = inject(Meta);
  currentPath = signal<string | undefined>(undefined);
  urlParams = signal<Record<string, any>>({});
  googleAnalyticsService = inject(GoogleAnalyticsService);

  constructor() {
    this.initializeRouterEvents();
  }

  /**
   * Initializes the router events to set the meta tags for each route.
   */
  initializeRouterEvents(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.getCurrentRoute(this.route);
        this.googleAnalyticsService.checkIfConsentIsAnswered();
        this.setMetaTagsForRoute(currentRoute.snapshot);
        this.setCurrentPagePath(currentRoute);
        this.updateUrlParams(currentRoute);
      });
  }

  /**
   * Recursively get the current activated route.
   * @param {ActivatedRoute} route - The current route
   * @returns {ActivatedRoute} - The deepest activated route
   */
  getCurrentRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  /**
   * Sets the meta tags for the current route.
   * @param {ActivatedRouteSnapshot} route - The current route
   */
  setMetaTagsForRoute(route: ActivatedRouteSnapshot) {
    this.projectTitle.setTitle(route.data['title']);
    this.meta.updateTag({
      name: 'description',
      content: route.data['description'],
    });
    this.meta.updateTag({ name: 'keywords', content: route.data['keywords'] });
    // Set the Open Graph meta tags
    this.meta.updateTag({
      name: 'title',
      property: 'og:title',
      content: route.data['title'],
    });
    this.meta.updateTag({
      name: 'description',
      property: 'og:description',
      content: route.data['description'],
    });
    this.meta.updateTag({
      name: 'image',
      property: 'og:image',
      content: `https://www.aheadcareers.com/svg/og-logo.svg`,
    });
    this.meta.updateTag({
      property: 'og:image:width',
      content: '1200',
    });
    this.meta.updateTag({
      property: 'og:image:height',
      content: '627',
    });
    this.meta.updateTag({
      property: 'og:url',
      content: `https://www.aheadcareers.com${this.router.url}`,
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }

  /**
   * Set the current page path from the route data.
   * @param {ActivatedRoute} route - The current route path
   */
  setCurrentPagePath(route: ActivatedRoute): void {
    route.url.subscribe(urlSegments => {
      const path = urlSegments.map(segment => segment.path).join('/');
      this.currentPath.set(path);
    });
  }

  /**
   * Update the URL parameters signal with the current route parameters.
   * @param {ActivatedRoute} route - The current route
   */
  updateUrlParams(route: ActivatedRoute): void {
    route.queryParams.subscribe(params => {
      this.urlParams.set(params);
    });
  }
}
