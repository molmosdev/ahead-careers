import { Component, HostListener, signal } from '@angular/core';
import { fadeInOutTrigger } from '../../../shared/animations';
import { moveToTheLeftTrigger } from './header.animations';
import { Button } from '@realm-ui/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'ac-header',
  imports: [Button, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [fadeInOutTrigger, moveToTheLeftTrigger],
})
export class HeaderComponent {
  scrolled = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled.set(document.documentElement.scrollTop > 200);
  }

  constructor(protected route: ActivatedRoute) {}

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
