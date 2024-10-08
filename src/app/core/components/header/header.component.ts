import { Component, HostListener, signal } from '@angular/core';
import { CtaComponent } from '../../../shared/components/cta/cta.component';
import { CtaType } from '../../../shared/components/cta/enums/cta-type';
import { fadeInOutTrigger, opacityTrigger } from '../../../shared/animations';
import { moveToTheLeftTrigger } from './header.animations';

@Component({
  selector: 'ac-header',
  standalone: true,
  imports: [CtaComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [opacityTrigger, fadeInOutTrigger, moveToTheLeftTrigger],
})
export class HeaderComponent {
  CtaType = CtaType;
  scrolled = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrolled.set(scrollPosition > 70);
  }
}
