import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'ac-sectors',
  imports: [],
  templateUrl: './sectors.component.html',
  styleUrl: './sectors.component.css',
})
export class SectorsComponent {
  sectors = input.required<string[]>();
  duplicatedSectors = computed(
    () => this.sectors()?.concat(this.sectors()!) || undefined
  );
  sliderLoopState = signal<boolean>(true);
}
