import { Component } from '@angular/core';
import { PlaceholderComponent } from '../../../shared/components/placeholder/placeholder.component';
import { fadeInOutTrigger } from '../../../shared/animations';

@Component({
  selector: 'ac-footer',
  imports: [PlaceholderComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  animations: [fadeInOutTrigger],
})
export class FooterComponent {}
