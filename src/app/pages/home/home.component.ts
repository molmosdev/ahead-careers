import { Component } from '@angular/core';
import { SanityService } from '../../core/services/sanity.service';
import { ValuesComponent } from './components/values/values.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';

@Component({
  selector: 'ac-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ValuesComponent, ExperiencesComponent],
})
export class HomeComponent {
  constructor(private sanityService: SanityService) {}
}
