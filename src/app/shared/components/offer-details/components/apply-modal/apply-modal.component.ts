import { Component, computed, input, model, signal } from '@angular/core';
import { Button } from '@realm-ui/angular';
import { Offer } from '../../../../../pages/offers/interfaces/offer.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ac-apply-modal',
  imports: [Button],
  templateUrl: './apply-modal.component.html',
  styleUrl: './apply-modal.component.css',
})
export class ApplyModalComponent {
  offer = input.required<Offer>();
  show = model<boolean>(false);
  applyForm = signal<FormGroup>(
    new FormGroup({
      cv: new FormControl(null, Validators.required),
    })
  );
  cvFileName = signal<string | null>(null);
  truncatedFileName = computed(() => {
    const fileName = this.cvFileName();
    if (!fileName) return null;
    if (fileName.length > 23) {
      const extension = fileName.slice(-4);
      return fileName.slice(0, 20) + '...' + extension;
    }
    return fileName;
  });

  /**
   * Triggers the file upload dialog
   */
  triggerFileUpload(): void {
    const fileInput = document.getElementById('cvUpload') as HTMLInputElement;
    fileInput.click();
  }

  /**
   * Handles the file selection event
   * @param {Event} event - The file selection event
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.applyForm().patchValue({ cv: file });
      this.cvFileName.set(file.name);
    }
  }
}
