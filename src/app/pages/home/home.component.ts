import { Component } from '@angular/core';
import { ValuesComponent } from './components/values/values.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { FadeInOnEnterViewDirective } from '../../shared/directives/fade-in-on-enter-view.directive';

@Component({
  selector: 'ac-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ValuesComponent, ExperiencesComponent, FadeInOnEnterViewDirective],
})
export class HomeComponent {
  constructor() {}
}
