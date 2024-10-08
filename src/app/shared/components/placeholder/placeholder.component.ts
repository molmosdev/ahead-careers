import { NgStyle } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'ac-placeholder',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './placeholder.component.html',
  styleUrl: './placeholder.component.css',
})
export class PlaceholderComponent {
  desktopHeight = input<number>();
  mobileHeight = input<number>();
  height = computed(() => (window.innerWidth > 768 ? this.desktopHeight() : this.mobileHeight()));
}
