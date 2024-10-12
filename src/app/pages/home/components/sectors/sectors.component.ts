import { Component, signal } from '@angular/core';
import { trigger, transition, style, animate, keyframes, query, animateChild, sequence } from '@angular/animations';
import { SanityService } from '../../../../core/services/sanity.service';

@Component({
  selector: 'ac-sectors',
  standalone: true,
  imports: [],
  templateUrl: './sectors.component.html',
  styleUrl: './sectors.component.css',
  animations: [
    trigger('fadeInExperiencesTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        sequence([
          query('@slider', animateChild(), { optional: true, delay: '1s' }),
          animate('0.5s ease-in', style({ opacity: 1 })),
        ]),
      ]),
    ]),
    trigger('slider', [
      transition('* <=> *', [
        animate(
          '100s',
          keyframes([
            style({ transform: 'translateX(0)', offset: 0 }),
            style({ transform: 'translateX(-100%)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SectorsComponent {
  sectors = signal<string[]>([]);
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
