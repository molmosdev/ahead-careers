import { Component, signal } from '@angular/core';
import { ValuesComponent } from './components/values/values.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { SanityService } from '../../core/services/sanity.service';
import { fadeInOutTrigger } from '../../shared/animations';
import { SectorsComponent } from './components/sectors/sectors.component';
import { CeoMessageComponent } from './components/ceo-message/ceo-message.component';
import { MethodologyComponent } from './components/methodology/methodology.component';
import { Button } from '@realm-ui/angular';
import { RouterLink } from '@angular/router';

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
  ],
  animations: [fadeInOutTrigger],
})
export class HomeComponent {
  description = signal<string | undefined>(undefined);
  constructor(private sanityService: SanityService) {
    this.getDescription();
  }

  async getDescription() {
    this.sanityService.getDataByType('businessDescription').then(data => {
      this.description.set(
        this.sanityService.transformBlockToHtml(data[0].description)
      );
    });
  }
}
