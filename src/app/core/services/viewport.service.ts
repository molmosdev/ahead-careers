import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  isScrolled = signal(false);
  isMobile = signal(false);

  setisScrolled(value: boolean): void {
    this.isScrolled.set(value);
  }

  setIsMobile(value: boolean): void {
    this.isMobile.set(value);
  }
}
