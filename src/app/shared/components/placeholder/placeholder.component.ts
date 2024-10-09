import { NgStyle } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'ac-placeholder',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './placeholder.component.html',
  styleUrl: './placeholder.component.css',
})
export class PlaceholderComponent implements OnInit {
  desktopHeight = input.required<number>();
  mobileHeight = input.required<number>();
  height: number = 0;

  ngOnInit() {
    this.setHeight();
  }

  setHeight() {
    if (typeof window !== 'undefined') {
      this.height = (window?.innerWidth > 768 ? this.desktopHeight() : this.mobileHeight()) || 0;
    } else {
      this.height = this.mobileHeight();
    }
  }
}
