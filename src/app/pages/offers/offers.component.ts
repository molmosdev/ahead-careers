import { Component, computed, inject } from '@angular/core';
import { SanityService } from '../../core/services/sanity.service';
import { Offer } from './interfaces/offer.interface';
import { RouterLink } from '@angular/router';
import { fadeInOutTrigger } from '../../shared/animations';

@Component({
  selector: 'ac-offers',
  imports: [RouterLink],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css',
  animations: [fadeInOutTrigger],
})
export class OffersComponent {
  sanityService = inject(SanityService);
  offers = computed<Offer[]>(() => this.sanityService.data.value()?.offers);

  constructor() {
    this.sanityService.params.set({
      type: 'offers',
      singleton: true,
      filters: [],
    });
  }
}
