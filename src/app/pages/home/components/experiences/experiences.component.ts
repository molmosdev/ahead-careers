import { Component, signal } from '@angular/core';
import { Experiences } from './interfaces/experiences';
import { SanityService } from '../../../../core/services/sanity.service';
import { JsonPipe } from '@angular/common';
import { PlaceholderComponent } from '../../../../shared/components/placeholder/placeholder.component';
import { experienceTrigger, fadeInExperiencesTrigger } from './experiences.animations';
import { fadeInOutTrigger } from '../../../../shared/animations';

@Component({
  selector: 'ac-experiences',
  standalone: true,
  imports: [JsonPipe, PlaceholderComponent],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css',
  animations: [fadeInOutTrigger, fadeInExperiencesTrigger, experienceTrigger],
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

  /**
   * Gets the data for the component
   */
  async getComponentData() {
    this.data.set((await this.sanityService.getDataByType('experiences', true)) as Experiences);
  }

  /**
   * Gets the html from a block
   * @param block - The block to get the html from
   * @returns {string} - The html from the block
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getHtmlFromBlock(block: any): string {
    return this.sanityService.transformBlockToHtml(block);
  }

  /**
   * Selects a specific experience
   * @param {number} index - The index of the experience
   */
  selectExperience(index: number) {
    this.currentIndex.set(index);
  }

  /**
   * Handles the keydown event and navigates to the previous or next experience
   * @param {KeyboardEvent} event - The keydown event
   */
  handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.prev();
        break;
      case 'ArrowRight':
        this.next();
        break;
    }
  }

  /**
   * Gets the position state of the experience at the given index
   * @param {number} index - The index of the experience
   * @returns {string} - The position state of the experience
   */
  getPositionState(index: number) {
    const total = this.data()?.experiences.length || 0;
    const current = this.currentIndex();

    if (index === current) {
      return 'center';
    } else if (index === (current + 1) % total) {
      return 'right';
    } else if (index === (current - 1 + total) % total) {
      return 'left';
    } else if (
      (index < current && index !== (current - 1 + total) % total) ||
      (index > current && index !== (current + 1) % total)
    ) {
      return 'invisibleLeft';
    } else {
      return 'invisibleRight';
    }
  }

  /**
   * Selects the previous experience
   */
  prev() {
    const total = this.data()!.experiences.length;
    this.currentIndex.set((this.currentIndex() - 1 + total) % total);
  }

  /**
   * Selects the next experience
   */
  next() {
    const total = this.data()!.experiences.length;
    this.currentIndex.set((this.currentIndex() + 1) % total);
  }

  /**
   * Handles the touch start event
   * @param {TouchEvent} event - The touch event
   */
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].clientX;
    this.touchStartY = event.changedTouches[0].clientY;
  }
  /**
   * Handles the touch end event
   * @param {TouchEvent} event - The touch event
   */
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.touchEndY = event.changedTouches[0].clientY;

    const deltaX = this.touchEndX - this.touchStartX;

    if (Math.abs(deltaX) > 20) {
      deltaX < 0 ? this.next() : this.prev();
    }
  }
}
