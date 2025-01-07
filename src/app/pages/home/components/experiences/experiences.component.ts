import {
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { SanityService } from '../../../../core/services/sanity.service';

import { fadeInOutTrigger } from '../../../../shared/animations';
import { Experiences } from './interfaces/experiences';
import { Button } from '@realm-ui/angular';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ac-experiences',
  imports: [Button, NgClass],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css',
  animations: [fadeInOutTrigger],
})
export class ExperiencesComponent implements OnInit {
  sanityService = inject(SanityService);
  data = signal<Experiences | undefined>(undefined);
  index = signal(0);
  experiencesContainer = viewChild<ElementRef>('experiencesContainer');
  isScrolling = signal(false);
  canScrollBackward = computed(() => this.index() > 0);
  canScrollForward = computed(
    () => this.index() < this.data()!.experiences.length - 1
  );

  /**
   * Initializes the component and fetches data from the Sanity service.
   */
  async ngOnInit(): Promise<void> {
    const data: Experiences = await this.sanityService.getDataByType(
      'experiences',
      true
    );
    this.data.set({
      ...data,
      experiences: data?.experiences?.map(experience => ({
        ...experience,
        content: this.sanityService.transformBlockToHtml(experience.content),
      })),
    });
  }

  /**
   * Scrolls the experiences container forward by one container width.
   * Prevents rapid consecutive clicks by using a scrolling flag.
   */
  scrollForward(): void {
    if (this.isScrolling() || !this.canScrollForward()) return; // Prevent rapid consecutive clicks and scrolling beyond the end

    const container = this.experiencesContainer()?.nativeElement;
    const size = container.clientWidth;

    this.isScrolling.set(true); // Activate scrolling flag
    container.scrollBy({
      left: size / 2,
      behavior: 'smooth',
    });

    container.addEventListener(
      'scrollend',
      () => {
        if (this.canScrollForward()) {
          this.index.set(this.index() + 1); // Increment index if possible
        }
        this.isScrolling.set(false); // Deactivate scrolling flag
      },
      { once: true }
    );
  }

  /**
   * Scrolls the experiences container backward by one container width.
   * Prevents rapid consecutive clicks by using a scrolling flag.
   */
  scrollBackward(): void {
    if (this.isScrolling() || !this.canScrollBackward()) return; // Prevent rapid consecutive clicks and scrolling beyond the start

    const container = this.experiencesContainer()?.nativeElement;
    const size = container.clientWidth;

    this.isScrolling.set(true); // Activate scrolling flag
    container.scrollBy({
      left: -size / 2,
      behavior: 'smooth',
    });

    container.addEventListener(
      'scrollend',
      () => {
        if (this.canScrollBackward()) {
          this.index.set(this.index() - 1); // Decrement index if possible
        }
        this.isScrolling.set(false); // Deactivate scrolling flag
      },
      { once: true }
    );
  }
}
