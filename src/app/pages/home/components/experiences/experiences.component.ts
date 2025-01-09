import {
  Component,
  inject,
  OnInit,
  signal,
  viewChild,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
} from '@angular/core';
import { SanityService } from '../../../../core/services/sanity.service';
import { Experiences } from './interfaces/experiences';
import { Button } from '@realm-ui/angular';

@Component({
  selector: 'ac-experiences',
  imports: [Button],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExperiencesComponent implements OnInit {
  sanityService = inject(SanityService);
  data = signal<Experiences | undefined>(undefined);
  swiper = viewChild<ElementRef>('swiper');

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
   * Slides to the next slide in the Swiper component.
   */
  slideNext(): void {
    this.swiper()?.nativeElement.swiper.slideNext();
  }

  /**
   * Slides to the previous slide in the Swiper component.
   */
  slidePrev(): void {
    this.swiper()?.nativeElement.swiper.slidePrev();
  }
}
