import { Component, signal } from '@angular/core';
import { Experiences } from './interfaces/experiences';
import { SanityService } from '../../../../core/services/sanity.service';
import { JsonPipe } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'ac-experiences',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css',
  animations: [
    trigger('carouselAnimation', [
      state(
        'center',
        style({
          transform: 'translateX(0%) scale(1)',
          zIndex: 10,
        })
      ),
      state(
        'left',
        style({
          transform: 'translateX(-70%) scale(0.7) rotateY(15deg)',
          zIndex: 5,
        })
      ),
      state(
        'right',
        style({
          transform: 'translateX(70%) scale(0.7) rotateY(-15deg)',
          zIndex: 5,
        })
      ),
      state(
        'invisible',
        style({
          opacity: 0,
          transform: 'translateX(200%)',
          zIndex: 0,
        })
      ),
      transition('* => *', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class ExperiencesComponent {
  data = signal<Experiences | undefined>(undefined);
  currentIndex = signal(0);
  touchStartX = 0;
  touchEndX = 0;

  constructor(private sanityService: SanityService) {
    this.getComponentData();
  }

  async getComponentData() {
    this.data.set((await this.sanityService.getDataByType('experiences', true)) as Experiences);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getHtmlFromBlock(block: any): string {
    return this.sanityService.transformBlockToHtml(block);
  }

  getPositionState(index: number) {
    const total = this.data()?.experiences.length || 0;
    const current = this.currentIndex();

    if (index === current) {
      return 'center';
    } else if ((index + 1) % total === current) {
      return 'left';
    } else if ((index - 1 + total) % total === current) {
      return 'right';
    } else {
      return 'invisible';
    }
  }

  prev() {
    const total = this.data()!.experiences.length;
    const newIndex = (this.currentIndex() - 1 + total) % total;
    this.currentIndex.set(newIndex);
  }

  next() {
    const total = this.data()!.experiences.length;
    const newIndex = (this.currentIndex() + 1) % total;
    this.currentIndex.set(newIndex);
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchMove(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
  }

  onTouchEnd() {
    if (this.touchEndX < this.touchStartX) {
      this.next();
    } else if (this.touchEndX > this.touchStartX) {
      this.prev();
    }
  }
}
