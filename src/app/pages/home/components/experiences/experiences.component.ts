import {
  Component,
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

@Component({
  selector: 'ac-experiences',
  imports: [Button],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css',
  animations: [fadeInOutTrigger],
})
export class ExperiencesComponent implements OnInit {
  sanityService = inject(SanityService);
  data = signal<Experiences | undefined>(undefined);
  experiencesContainer = viewChild<ElementRef>('experiencesContainer');

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

  scrollForward() {
    const container = this.experiencesContainer()?.nativeElement;
    const size = container.clientWidth;
    console.log(size);
    container.scrollBy({
      left: size,
      behavior: 'smooth',
    });
  }

  scrollBackward() {
    const container = this.experiencesContainer()?.nativeElement;
    const size = container.clientWidth;
    console.log(size);
    container.scrollBy({
      left: -size,
      behavior: 'smooth',
    });
  }
}
