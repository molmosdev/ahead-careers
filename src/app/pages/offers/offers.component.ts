import { Component, computed } from '@angular/core';
import { SanityService } from '../../core/services/sanity.service';
import { Offer } from './interfaces/offer.interface';
import { fadeInOutTrigger } from '../../shared/animations';

@Component({
  selector: 'ac-offers',
  imports: [],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css',
  animations: [fadeInOutTrigger],
})
export class OffersComponent {
  offers = computed<Offer[]>(() => this.sanityService.data.value()?.offers);

  constructor(private sanityService: SanityService) {
    this.sanityService.params.set({ type: 'offers', singleton: true });
  }
}
