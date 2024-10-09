import { Component, HostListener, signal } from '@angular/core';
import { CtaComponent } from '../../../shared/components/cta/cta.component';
import { CtaType } from '../../../shared/components/cta/enums/cta-type';
import { fadeInOutTrigger } from '../../../shared/animations';
import { moveToTheLeftTrigger } from './header.animations';

@Component({
  selector: 'ac-header',
  standalone: true,
  imports: [CtaComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [fadeInOutTrigger, moveToTheLeftTrigger],
})
export class HeaderComponent {
  CtaType = CtaType;
  scrolled = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled.set(document.documentElement.scrollTop > 200);
  }
}
