import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ViewportService } from '../../core/services/viewport.service';

@Directive({
  selector: '[ac-track-visibility]',
})
export class TrackVisibilityDirective implements OnInit, OnDestroy {
  trackId = input<string | undefined>(undefined);
  el = inject(ElementRef);
  viewportService = inject(ViewportService);

  private observer!: IntersectionObserver;

  ngOnInit(): void {
    if (this.trackId()) {
      this.viewportService.registerElement(this.trackId()!);

      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const isVisible = entry.isIntersecting;
          this.viewportService.updateElementVisibility(
            this.trackId()!,
            isVisible
          );
        });
      });

      this.observer.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
