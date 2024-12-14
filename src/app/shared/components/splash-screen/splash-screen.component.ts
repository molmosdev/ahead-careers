import { Component } from '@angular/core';
import { splashLogoTrigger } from './splash-screen.animations';

@Component({
  selector: 'ac-splash-screen',
  imports: [],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.css',
  animations: [splashLogoTrigger],
})
export class SplashScreenComponent {}
