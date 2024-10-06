import { Component } from '@angular/core';
import { CtaType } from '../../shared/components/cta/enums/cta-type';
import { CtaComponent } from '../../shared/components/cta/cta.component';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'ac-home',
  standalone: true,
  imports: [HeaderComponent, CtaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  CtaType = CtaType;
}
