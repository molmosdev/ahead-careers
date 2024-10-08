import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { animate, AnimationControls, inView } from 'motion';

@Directive({
  selector: '[acFadeInOnEnterView]',
  standalone: true,
})
export class FadeInOnEnterViewDirective implements OnInit, OnDestroy {
  private fadeAnimation: AnimationControls | undefined;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    inView(this.el.nativeElement, () => {
      this.fadeAnimation = animate(this.el.nativeElement, { opacity: [0, 1] }, { duration: 1, delay: 0.2 });
      return () => this.fadeAnimation?.stop();
    });
  }

  ngOnDestroy() {
    if (this.fadeAnimation) {
      this.fadeAnimation.stop();
    }
  }
}