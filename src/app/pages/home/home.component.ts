import { Component } from '@angular/core';
import { SanityService } from '../../core/services/sanity.service';
import { ValuesComponent } from './components/values/values.component';

@Component({
  selector: 'ac-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ValuesComponent],
})
export class HomeComponent {
  constructor(private sanityService: SanityService) {}
}
