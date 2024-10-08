import { Component, HostListener, signal } from '@angular/core';
import { CtaComponent } from '../../../shared/components/cta/cta.component';
import { CtaType } from '../../../shared/components/cta/enums/cta-type';
import {
  ctaAppearTrigger,
  moveLeftTrigger,
  opacityTrigger,
} from '../../../shared/components/cta/animations/animations';

@Component({
  selector: 'ac-header',
  standalone: true,
  imports: [CtaComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [opacityTrigger, moveLeftTrigger, ctaAppearTrigger],
})
export class HeaderComponent {
  CtaType = CtaType;
  scrolled = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrolled.set(scrollPosition > 0);
  }
}
