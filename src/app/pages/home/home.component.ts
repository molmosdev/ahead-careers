import { Component } from '@angular/core';
import { ValuesComponent } from './components/values/values.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { PlaceholderComponent } from '../../shared/components/placeholder/placeholder.component';
import { FadeInOutDirective } from '../../shared/directives/fade-in-out.directive';

@Component({
  selector: 'ac-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ValuesComponent, ExperiencesComponent, PlaceholderComponent, FadeInOutDirective],
})
export class HomeComponent {
  constructor() {}
}
