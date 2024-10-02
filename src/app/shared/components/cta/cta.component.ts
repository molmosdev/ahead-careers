import { Component, input } from '@angular/core';
import { CtaType } from './enums/cta-type';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ac-cta',
  standalone: true,
  imports: [NgClass],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.css',
})
export class CtaComponent {
  type = input<CtaType>(CtaType.Primary);
}
