import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  isMobile = signal(false);

  /**
   * Sets the isMobile signal
   * @param {boolean} value - The value to set
   */
  setIsMobile(value: boolean): void {
    this.isMobile.set(value);
  }
}
