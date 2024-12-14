import { Component, computed, inject } from '@angular/core';
import { fadeInOutTrigger } from '../../../shared/animations';
import { moveToTheLeftTrigger } from './header.animations';
import { Button } from '@realm-ui/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ViewportService } from '../../services/viewport.service';
import { RouteService } from '../../services/route.service';
import { Path } from '../../../shared/enums/path';

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
  viewportService = inject(ViewportService);
  isScrolled = computed(() => this.viewportService.isScrolled());
  isMobile = computed(() => this.viewportService.isMobile());
  currentPath = computed(() => this.routeService.currentPath());
  isHomePage = computed(() => this.routeService.currentPath() === Path.Home);
}
