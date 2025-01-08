import { Component, computed, inject, linkedSignal } from '@angular/core';
import { Button, InViewportService } from '@realm-ui/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RouteService } from '../../services/route.service';
import { Path } from '../../../shared/enums/path';
import { ResponsiveService } from '../../services/responsive.service';
import { ContactUsModalService } from '../../services/contact-us-modal.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ac-header',
  imports: [Button, RouterLink, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  route = inject(ActivatedRoute);
  routeService = inject(RouteService);
  isBlank = computed(() => !!this.routeService.urlParams()['_blank']);
  responsiveService = inject(ResponsiveService);
  inViewportService = inject(InViewportService);
  isMobile = computed(() => this.responsiveService.isMobile());
  currentPath = computed(() => this.routeService.currentPath());
  isHomePage = computed(() => this.routeService.currentPath() === Path.Home);
  isOffersCtaVisible = linkedSignal(() => {
    return this.inViewportService.elements()['offers-cta'];
  });
  contactUsModalService = inject(ContactUsModalService);
  isContactUsModalOpen = computed(() => this.contactUsModalService.isOpen());
  router = inject(Router);
  isMovedToLeft = computed(
    () => !this.isOffersCtaVisible() && !this.isMobile() && this.isHomePage()
  );

  executeDynamicButton() {
    if (this.isHomePage()) {
      this.contactUsModalService.isOpen.set(true);
    } else {
      this.router.navigateByUrl(Path.Home);
    }
  }
}
