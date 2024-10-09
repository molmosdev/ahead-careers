/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, signal } from '@angular/core';
import { SanityService } from '../../../../core/services/sanity.service';
import { JsonPipe } from '@angular/common';
import { Values } from './interfaces/values';
import { PlaceholderComponent } from '../../../../shared/components/placeholder/placeholder.component';
import { fadeInOutTrigger } from '../../../../shared/animations';

@Component({
  selector: 'ac-values',
  standalone: true,
  imports: [JsonPipe, PlaceholderComponent],
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
    this.data.set((await this.sanityService.getDataByType('values', true)) as Values);
  }

  getHtmlFromBlock(block: any): string {
    return this.sanityService.transformBlockToHtml(block);
  }
}
