import { Component, computed, input, signal } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from '@angular/animations';
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
  sectors = input.required<string[]>();
  duplicatedSectors = computed(
    () => this.sectors()?.concat(this.sectors()!) || undefined
  );
  sliderLoopState = signal<boolean>(true);
}
