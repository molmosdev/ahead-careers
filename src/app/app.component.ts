import { Component, computed, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { fadeInOutTrigger } from './shared/animations';
import { ViewportService } from './core/services/viewport.service';
import { OffersButtonComponent } from './shared/components/offers-button/offers-button.component';
import { RouteService } from './core/services/route.service';
import { Path } from './shared/enums/path';

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
  animations: [fadeInOutTrigger],
})
export class AppComponent {
  viewportService = inject(ViewportService);
  isMobile = computed(() => this.viewportService.isMobile());
  isScrolled = computed(() => this.viewportService.isScrolled());
  routeService = inject(RouteService);
  isHomePage = computed(() => this.routeService.currentPath() === Path.Home);

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
