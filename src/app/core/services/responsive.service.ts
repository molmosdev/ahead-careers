import { Injectable, HostListener, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  public isMobile = signal<boolean>(this.getIsMobile());

  constructor() {
    this.isMobile.set(this.getIsMobile());
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile.set(this.getIsMobile());
  }

  private getIsMobile(): boolean {
    return window.innerWidth < 768;
  }
}
