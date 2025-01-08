import {
  Component,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { Button, Text, Number } from '@realm-ui/angular';
import { Offer } from '../../../../../pages/offers/interfaces/offer.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SanityService } from '../../../../../core/services/sanity.service'; // Importa el servicio
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ac-apply-modal',
  imports: [Button, Text, Number, RouterLink],
  templateUrl: './apply-modal.component.html',
  styleUrl: './apply-modal.component.css',
})
export class ApplyModalComponent {
  offer = input.required<Offer>();
  show = model<boolean>(false);
  applyForm = signal<FormGroup>(
    new FormGroup({
      firstName: new FormControl<string | null>(null, [Validators.required]),
      lastName: new FormControl<string | null>(null, [Validators.required]),
      phone: new FormControl<number | null>(null, [Validators.required]),
      email: new FormControl<string | null>(null, [
        Validators.required,
        Validators.email,
      ]),
      availability: new FormControl<string | null>(null, [Validators.required]),
      cv: new FormControl(null, [Validators.required, this.fileTypeValidator]),
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
  loading = signal<boolean>(false);
  sanityService = inject(SanityService);
  applied = signal<boolean>(false);

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
      this.applyForm().get('cv')!.markAsTouched();
      this.cvFileName.set(file.name);
    }
  }

  /**
   * Custom validator to check file type
   * @param {FormControl} control - The form control
   * @returns {ValidationErrors | null} - The validation result
   */
  fileTypeValidator(control: FormControl): Record<string, any> | null {
    const file = control.value;
    if (file) {
      const extension = file.name.slice(-4).toLowerCase();
      if (extension !== '.pdf') {
        return { fileType: true };
      }
    }
    return null;
  }

  /**
   * Applies the offer
   * @returns {Promise<void>} - The promise
   */
  async applyOffer(): Promise<void> {
    this.applyForm().markAllAsTouched();
    if (this.applyForm().invalid) return;
    this.loading.set(true);
    const file = this.applyForm().value.cv;

    try {
      const asset = await this.sanityService.uploadFile(file);

      const document = {
        _type: 'application',
        cv: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
        offerId: this.offer().offerId,
        jobTitle: this.offer().jobTitle,
        firstName: this.applyForm().value.firstName,
        lastName: this.applyForm().value.lastName,
        phone: this.applyForm().value.phone as number,
        email: this.applyForm().value.email,
        availability: this.applyForm().value.availability,
      };

      await this.sanityService.postDocument(document);
      this.applied.set(true);
    } catch (error) {
      console.error('Error while applying for the offer', error);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Checks if a form control is invalid and touched
   * @param {string} controlName - The name of the control
   * @returns {boolean} - The result
   */
  isInvalidAndNotTouched(controlName: string): boolean {
    const control = this.applyForm().get(controlName);
    return control!.invalid && control!.touched;
  }

  /**
   * Sets the value of a form control
   * @param {string} controlName
   * @param {any} value
   */
  setValue(controlName: string, value: any): void {
    this.applyForm().get(controlName)!.setValue(value);
    this.applyForm().get(controlName)!.markAsTouched();
  }
}
