import { Component } from '@angular/core';
import { ValuesComponent } from './components/values/values.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { fadeInOutTrigger } from '../../shared/animations';

@Component({
  selector: 'ac-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ValuesComponent, ExperiencesComponent],
  animations: [fadeInOutTrigger],
})
export class HomeComponent {
  constructor() {}
}
