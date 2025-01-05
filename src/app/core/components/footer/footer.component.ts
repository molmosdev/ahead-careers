import { Component, computed, inject } from '@angular/core';
import { fadeInOutTrigger } from '../../../shared/animations';
import { RouterLink } from '@angular/router';
import { RouteService } from '../../services/route.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ac-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  imports: [RouterLink, NgClass],
  animations: [fadeInOutTrigger],
})
export class FooterComponent {
  routeService = inject(RouteService);
  isBlank = computed(() => !!this.routeService.urlParams()['_blank']);
}
