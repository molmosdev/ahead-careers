import { inject, Injectable, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  router = inject(Router);
  route = inject(ActivatedRoute);
  projectTitle = inject(Title);
  meta = inject(Meta);
  currentPath = signal<string | undefined>(undefined);

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
        this.setMetaTagsForRoute(currentRoute.snapshot);
        this.setCurrentPagePath(currentRoute);
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
}
