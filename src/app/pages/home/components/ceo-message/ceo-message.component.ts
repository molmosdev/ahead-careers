import { Component, input } from '@angular/core';
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
  ceoMessage = input.required<string>();
}
