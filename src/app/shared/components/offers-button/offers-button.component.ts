import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@realm-ui/angular';

@Component({
  selector: 'ac-offers-button',
  imports: [Button, RouterLink],
  templateUrl: './offers-button.component.html',
  styleUrl: './offers-button.component.css',
})
export class OffersButtonComponent {}
