import { Component } from '@angular/core';
import { fadeInOutTrigger } from '../../../shared/animations';

@Component({
  selector: 'ac-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  animations: [fadeInOutTrigger],
})
export class FooterComponent {}
