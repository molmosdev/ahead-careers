import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { SanityService } from '../../core/services/sanity.service';
import { Offer } from './interfaces/offer.interface';
import { RouterLink } from '@angular/router';
import { Button } from '@realm-ui/angular';

@Component({
  selector: 'ac-offers',
  imports: [RouterLink, Button],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css',
})
export class OffersComponent implements OnInit {
  @Input() id = '';
  sanityService = inject(SanityService);
  offers = computed<Offer[]>(() => this.sanityService.data.value()?.offers);

  ngOnInit(): void {
    if (!this.id) {
      this.sanityService.params.set({ type: 'offers', singleton: true });
    }
  }
}
