import { Component, signal } from '@angular/core';
import { Experiences } from './interfaces/experiences';
import { SanityService } from '../../../../core/services/sanity.service';
import { JsonPipe } from '@angular/common';
import { PlaceholderComponent } from '../../../../shared/components/placeholder/placeholder.component';
import { carrouselTrigger, fadeInExperiencesTrigger } from './experiences.animations';
import { fadeInOutTrigger } from '../../../../shared/animations';

@Component({
  selector: 'ac-experiences',
  standalone: true,
  imports: [JsonPipe, PlaceholderComponent],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css',
  animations: [fadeInOutTrigger, fadeInExperiencesTrigger, carrouselTrigger],
})
export class ExperiencesComponent {
  data = signal<Experiences | undefined>(undefined);
  currentIndex = signal(0);
  touchStartX = 0;
  touchEndX = 0;
  touchStartY = 0;
  touchEndY = 0;

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
    this.touchStartY = event.changedTouches[0].screenY;
  }

  onTouchMove(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.touchEndY = event.changedTouches[0].screenY;
  }

  onTouchEnd() {
    const deltaY = Math.abs(this.touchEndY - this.touchStartY);

    if (deltaY > 20) {
      // No hacer nada si el desplazamiento vertical es mayor a 10 píxeles
      return;
    }

    if (this.touchEndX < this.touchStartX) {
      this.next();
    } else if (this.touchEndX > this.touchStartX) {
      this.prev();
    }
  }
}
