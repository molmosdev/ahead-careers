import { Component, signal } from '@angular/core';
import { SanityService } from '../../../../core/services/sanity.service';
import { PlaceholderComponent } from '../../../../shared/components/placeholder/placeholder.component';
import { fadeInOutTrigger } from '../../../../shared/animations';

@Component({
  selector: 'ac-ceo-message',
  imports: [PlaceholderComponent],
  templateUrl: './ceo-message.component.html',
  styleUrl: './ceo-message.component.css',
  animations: [fadeInOutTrigger],
})
export class CeoMessageComponent {
  ceoMessage = signal<string | undefined>(undefined);

  constructor(private sanityService: SanityService) {
    this.getComponentData();
  }

  /**
   * Gets the data for the component
   */
  async getComponentData() {
    this.sanityService.getDataByType('businessDescription').then(data => {
      this.ceoMessage.set(this.sanityService.transformBlockToHtml(data[0].ceoMessage));
    });
  }
}
