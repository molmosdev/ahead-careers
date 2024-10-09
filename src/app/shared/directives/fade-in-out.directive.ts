import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { animate, AnimationControls, inView } from 'motion';

@Directive({
  selector: '[acFadeInOut]',
  standalone: true,
})
export class FadeInOutDirective implements OnInit, OnDestroy {
  animation: AnimationControls | undefined;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    inView(this.el.nativeElement, () => {
      this.animation = animate(this.el.nativeElement, { opacity: [0, 1] }, { duration: 1, delay: 0.5 });
      return () => this.animation?.stop();
    });
  }

  ngOnDestroy() {
    this.animation?.stop();
  }
}
