import { Component, inject } from '@angular/core';
import { fadeInOutTrigger } from '../../../shared/animations';
import { RouterLink } from '@angular/router';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'ac-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  imports: [RouterLink],
  animations: [fadeInOutTrigger],
})
export class FooterComponent {
  routeService = inject(RouteService);
}
