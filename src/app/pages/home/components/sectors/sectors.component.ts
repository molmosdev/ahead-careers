import { Component, computed, signal } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { SanityService } from '../../../../core/services/sanity.service';
import { fadeInOutTrigger } from '../../../../shared/animations';

@Component({
  selector: 'ac-sectors',
  imports: [],
  templateUrl: './sectors.component.html',
  styleUrl: './sectors.component.css',
  animations: [
    fadeInOutTrigger,
    trigger('slider', [
      transition('* => *', [
        animate(
          '100s',
          keyframes([
            style({ transform: 'translateX(0)', offset: 0 }),
            style({ transform: 'translateX(-50%)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SectorsComponent {
  sectors = signal<string[] | undefined>(undefined);
  duplicatedSectors = computed(() => this.sectors()?.concat(this.sectors()!) || undefined);
  sliderLoopState = signal<boolean>(true);

  constructor(private sanityService: SanityService) {
    this.getComponentData();
  }

  /**
   * Gets the data for the component
   */
  async getComponentData() {
    const businessDescription = await this.sanityService.getDataByType('businessDescription', true);
    this.sectors.set(businessDescription.sectors);
  }
}
