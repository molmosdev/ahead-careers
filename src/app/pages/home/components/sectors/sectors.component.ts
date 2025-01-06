import { Component, computed, input, signal } from '@angular/core';
import { fadeInOutTrigger } from '../../../../shared/animations';

@Component({
  selector: 'ac-sectors',
  imports: [],
  templateUrl: './sectors.component.html',
  styleUrl: './sectors.component.css',
  animations: [fadeInOutTrigger],
})
export class SectorsComponent {
  sectors = input.required<string[]>();
  duplicatedSectors = computed(
    () => this.sectors()?.concat(this.sectors()!) || undefined
  );
  sliderLoopState = signal<boolean>(true);
}
