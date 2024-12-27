import { Component, signal } from '@angular/core';
import { SanityService } from '../../../../core/services/sanity.service';
import { Methodology } from './interfaces/methodology';
import { fadeInOutTrigger } from '../../../../shared/animations';

@Component({
  selector: 'ac-methodology',
  imports: [],
  templateUrl: './methodology.component.html',
  styleUrl: './methodology.component.css',
  animations: [fadeInOutTrigger],
})
export class MethodologyComponent {
  data = signal<Methodology | undefined>(undefined);
  selectedStep = signal<number>(0);

  constructor(private sanityService: SanityService) {
    this.getComponentData();
  }

  /**
   * Gets the data for the component
   */
  async getComponentData() {
    this.data.set(
      (await this.sanityService.getDataByType(
        'methodology',
        true
      )) as Methodology
    );
  }

  /**
   * Gets the html from a block
   * @param block - The block to get the html from
   * @returns {string} - The html from the block
   */
  getHtmlFromBlock(block: any): string {
    return this.sanityService.transformBlockToHtml(block);
  }
}
