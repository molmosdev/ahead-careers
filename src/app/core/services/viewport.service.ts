import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  isMobile = signal(false);
  elementsTracker = signal<Record<string, boolean>>({});

  setIsMobile(value: boolean): void {
    this.isMobile.set(value);
  }

  registerElement(id: string): Signal<boolean> {
    const elements = this.elementsTracker();
    if (!(id in elements)) {
      this.elementsTracker.set({ ...elements, [id]: false });
    }
    return signal(this.elementsTracker()[id]);
  }

  updateElementVisibility(id: string, isVisible: boolean): void {
    const elements = this.elementsTracker();
    if (id in elements) {
      this.elementsTracker.set({ ...elements, [id]: isVisible });
    }
  }
}
