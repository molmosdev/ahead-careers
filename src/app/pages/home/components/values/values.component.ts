import { Component, signal } from '@angular/core';
import { SanityService } from '../../../../core/services/sanity.service';
import { Values } from './interfaces/values';
import { fadeInOutTrigger } from '../../../../shared/animations';

@Component({
  selector: 'ac-values',
  imports: [],
  templateUrl: './values.component.html',
  styleUrl: './values.component.css',
  animations: [fadeInOutTrigger],
})
export class ValuesComponent {
  data = signal<Values | undefined>(undefined);
  constructor(private sanityService: SanityService) {
    this.getComponentData();
  }

  async getComponentData() {
    this.data.set(
      (await this.sanityService.getDataByType('values', true)) as Values
    );
  }

  getHtmlFromBlock(block: any): string {
    return this.sanityService.transformBlockToHtml(block);
  }
}
