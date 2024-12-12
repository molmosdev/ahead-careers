import {
  Component,
  computed,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  Router,
  NavigationEnd,
  ActivatedRouteSnapshot,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import {
  fadeInOutTrigger,
  fadeInOutVerticalTrigger,
} from './shared/animations';
import { ViewportService } from './core/services/viewport.service';
import { OffersButtonComponent } from './shared/components/offers-button/offers-button.component';

@Component({
  selector: 'ac-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    OffersButtonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [fadeInOutTrigger, fadeInOutVerticalTrigger],
})
export class AppComponent implements OnInit {
  router = inject(Router);
  meta = inject(Meta);
  projectTitle = inject(Title);
  viewportService = inject(ViewportService);
  isMobile = computed(() => this.viewportService.isMobile());
  isScrolled = computed(() => this.viewportService.isScrolled());

  ngOnInit(): void {
    this.initializeRouterEvents();
  }

  initializeRouterEvents(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setMetaTagsForRoute(this.router.routerState.snapshot.root);
      });
  }

  setMetaTagsForRoute(route: ActivatedRouteSnapshot) {
    this.projectTitle.setTitle(route.data['title']);
    this.meta.updateTag({
      name: 'description',
      content: route.data['description'],
    });
    this.meta.updateTag({ name: 'keywords', content: route.data['keywords'] });
  }

  /* Viewport host listeners */
  @HostListener('window:load', [])
  onWindowLoad() {
    this.viewportService.setIsMobile(window.innerWidth < 768);
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.viewportService.setIsMobile(window.innerWidth < 768);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.viewportService.setisScrolled(
      document.documentElement.scrollTop > 200
    );
  }
}
