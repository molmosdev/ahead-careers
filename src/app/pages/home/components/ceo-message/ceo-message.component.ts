import { Component, input } from '@angular/core';

@Component({
  selector: 'ac-ceo-message',
  imports: [],
  templateUrl: './ceo-message.component.html',
  styleUrl: './ceo-message.component.css',
})
export class CeoMessageComponent {
  ceoMessage = input.required<string>();
}
