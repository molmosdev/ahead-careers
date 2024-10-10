import { Component, signal } from '@angular/core';
import { SanityService } from '../../../../core/services/sanity.service';
import { fadeInOutTrigger } from '../../../../shared/animations';

@Component({
  selector: 'ac-sectors',
  standalone: true,
  imports: [],
  templateUrl: './sectors.component.html',
  styleUrl: './sectors.component.css',
  animations: [fadeInOutTrigger],
})
export class SectorsComponent {
  sectors = signal<string[]>([]);

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
