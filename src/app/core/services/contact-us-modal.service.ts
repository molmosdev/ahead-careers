import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactUsModalService {
  isOpen = signal<boolean>(false);
}
