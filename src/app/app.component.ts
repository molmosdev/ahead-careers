import {
  Component,
  computed,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { fadeInOutTrigger, fadeOutTrigger } from './shared/animations';
import { OffersButtonComponent } from './shared/components/offers-button/offers-button.component';
import { RouteService } from './core/services/route.service';
import { Path } from './shared/enums/path';
import { SplashScreenComponent } from './shared/components/splash-screen/splash-screen.component';
import { InViewportService } from '@realm-ui/angular';
import { ResponsiveService } from './core/services/responsive.service';

@Component({
  selector: 'ac-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    OffersButtonComponent,
    SplashScreenComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [fadeInOutTrigger, fadeOutTrigger],
})
export class AppComponent {
  responsiveService = inject(ResponsiveService);
  inViewportService = inject(InViewportService);
  isMobile = computed(() => this.responsiveService.isMobile());
  routeService = inject(RouteService);
  isHomePage = computed(() => this.routeService.currentPath() === Path.Home);
  isSplashScreenVisible = signal<boolean>(true);
  isOffersCtaVisible = computed(
    () => this.inViewportService.elements()['offers-cta']
  );

  constructor() {
    this.initializeSplashScreen();
  }

  /**
   * Initializes the splash screen
   */
  initializeSplashScreen(): void {
    setTimeout(() => {
      this.isSplashScreenVisible.set(false);
    }, 1500);
  }

  /* Viewport host listeners */
  @HostListener('window:load', [])
  onWindowLoad() {
    this.responsiveService.setIsMobile(window.innerWidth < 768);
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.responsiveService.setIsMobile(window.innerWidth < 768);
  }
}
