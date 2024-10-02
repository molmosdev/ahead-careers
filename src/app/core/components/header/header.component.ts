import { Component } from '@angular/core';
import { CtaComponent } from '../../../shared/components/cta/cta.component';
import { CtaType } from '../../../shared/components/cta/enums/cta-type';

@Component({
  selector: 'ac-header',
  standalone: true,
  imports: [CtaComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  CtaType = CtaType;
}
