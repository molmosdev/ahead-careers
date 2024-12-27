import { Component, input } from '@angular/core';
import { fadeInOutTrigger } from '../../../../shared/animations';

@Component({
  selector: 'ac-ceo-message',
  imports: [],
  templateUrl: './ceo-message.component.html',
  styleUrl: './ceo-message.component.css',
  animations: [fadeInOutTrigger],
})
export class CeoMessageComponent {
  ceoMessage = input.required<string>();
}
