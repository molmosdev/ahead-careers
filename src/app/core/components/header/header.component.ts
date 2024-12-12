import { Component, computed, inject } from '@angular/core';
import { fadeInOutTrigger } from '../../../shared/animations';
import { moveToTheLeftTrigger } from './header.animations';
import { Button } from '@realm-ui/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ViewportService } from '../../services/viewport.service';

@Component({
  selector: 'ac-header',
  imports: [Button, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [fadeInOutTrigger, moveToTheLeftTrigger],
})
export class HeaderComponent {
  route = inject(ActivatedRoute);
  viewportService = inject(ViewportService);
  isScrolled = computed(() => this.viewportService.isScrolled());
  isMobile = computed(() => this.viewportService.isMobile());

  /**
   * Gets the current page title from the route data.
   * @returns The title of the current page
   */
  getCurrentPageTitle(): string {
    let title = '';
    this.route.firstChild?.data.subscribe(data => {
      title = data['title'];
    });
    return title;
  }

  isOffersPage(): boolean {
    return this.getCurrentPageTitle() === 'Ofertas - Ahead Careers';
  }
}
