import { Component, computed, inject } from '@angular/core';
import { fadeInOutTrigger } from '../../../shared/animations';
import { moveToTheLeftTrigger } from './header.animations';
import { Button, InViewportService } from '@realm-ui/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RouteService } from '../../services/route.service';
import { Path } from '../../../shared/enums/path';
import { ResponsiveService } from '../../services/responsive.service';
import { ContactUsModalService } from '../../services/contact-us-modal.service';

@Component({
  selector: 'ac-header',
  imports: [Button, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [fadeInOutTrigger, moveToTheLeftTrigger],
})
export class HeaderComponent {
  route = inject(ActivatedRoute);
  routeService = inject(RouteService);
  responsiveService = inject(ResponsiveService);
  inViewportService = inject(InViewportService);
  isMobile = computed(() => this.responsiveService.isMobile());
  currentPath = computed(() => this.routeService.currentPath());
  isHomePage = computed(() => this.routeService.currentPath() === Path.Home);
  isOffersCtaVisible = computed(
    () => this.inViewportService.elements()['offers-cta']
  );
  contactUsModalService = inject(ContactUsModalService);
  isContactUsModalOpen = computed(() => this.contactUsModalService.isOpen());
  router = inject(Router);

  executeDynamicButton() {
    if (this.isHomePage()) {
      this.contactUsModalService.isOpen.set(true);
    } else {
      this.router.navigate([Path.Home]);
    }
  }
}
