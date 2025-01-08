import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ValuesComponent } from './components/values/values.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { SanityService } from '../../core/services/sanity.service';
import { fadeInOutTrigger } from '../../shared/animations';
import { SectorsComponent } from './components/sectors/sectors.component';
import { CeoMessageComponent } from './components/ceo-message/ceo-message.component';
import { MethodologyComponent } from './components/methodology/methodology.component';
import {
  Button,
  InViewportDirective,
  InViewportService,
} from '@realm-ui/angular';
import { RouterLink } from '@angular/router';
import { BusinessDescription } from '../../shared/interfaces/business-description';

@Component({
  selector: 'ac-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    ValuesComponent,
    ExperiencesComponent,
    SectorsComponent,
    CeoMessageComponent,
    MethodologyComponent,
    Button,
    RouterLink,
    InViewportDirective,
  ],
  animations: [fadeInOutTrigger],
})
export class HomeComponent implements OnInit, OnDestroy {
  sanityService = inject(SanityService);
  businessDescription = signal<BusinessDescription | undefined>(undefined);
  InViewportService = inject(InViewportService);

  async ngOnInit(): Promise<void> {
    const data: BusinessDescription = await this.sanityService.getDataByType(
      'businessDescription',
      true
    );
    this.businessDescription.set({
      ...data,
      ceoMessage: this.sanityService.transformBlockToHtml(data?.ceoMessage),
      description: this.sanityService.transformBlockToHtml(data?.description),
    });
  }

  ngOnDestroy(): void {
    this.InViewportService.updateElementVisibility('offers-cta', true);
  }
}
