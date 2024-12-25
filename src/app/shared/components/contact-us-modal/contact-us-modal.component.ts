import { Component, computed, effect, signal } from '@angular/core';
import {
  Tab,
  Tabs,
  Button,
  Text,
  Number,
  Textarea,
  Select,
  Option,
} from '@realm-ui/angular';
import { RequestType } from '../../enums/request-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessRequestReason } from './enums/business-request-reason.enum';

@Component({
  selector: 'ac-contact-us-modal',
  imports: [Tabs, Tab, Button, Text, Number, Textarea, Select, Option],
  templateUrl: './contact-us-modal.component.html',
  styleUrl: './contact-us-modal.component.css',
})
export class ContactUsModalComponent {
  RequestType = RequestType;
  BusinessRequestReason = BusinessRequestReason;
  selectedRequestType = signal<RequestType>(RequestType.Business);
  requestForm = signal<FormGroup>(
    new FormGroup({
      firstName: new FormControl<string | null>(null, [Validators.required]),
      lastName: new FormControl<string | null>(null, [Validators.required]),
      companyName: new FormControl<string | null>(null, [Validators.required]),
      position: new FormControl<string | null>(null, [Validators.required]),
      phone: new FormControl<number | null>(null, [Validators.required]),
      email: new FormControl<string | null>(null, [
        Validators.required,
        Validators.email,
      ]),
      reason: new FormControl<BusinessRequestReason>(
        BusinessRequestReason.Information,
        [Validators.required]
      ),
      extraInfo: new FormControl<string | null>(null),
      file: new FormControl(null, [
        Validators.required,
        this.fileTypeValidator,
      ]),
    })
  );
  fileName = signal<string | null>(null);
  truncatedFileName = computed(() => {
    const fileName = this.fileName();
    if (!fileName) return null;
    if (fileName.length > 23) {
      const extension = fileName.slice(-4);
      return fileName.slice(0, 20) + '...' + extension;
    }
    return fileName;
  });

  constructor() {
    effect(() => {
      this.resetFormFields();
    });
  }

  /**
   * Resets the form fields based on the selected request type
   */
  resetFormFields(): void {
    if (this.selectedRequestType() === RequestType.Candidate) {
      this.requestForm().get('companyName')!.reset();
      this.requestForm().get('position')!.reset();
      this.requestForm()
        .get('reason')!
        .setValue(BusinessRequestReason.Information);
    }
    this.requestForm().get('file')!.reset();
    this.requestForm().markAsUntouched();
    this.fileName.set(null);
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
   * Checks if a form control is invalid and touched
   * @param {string} controlName - The name of the control
   * @returns {boolean} - The result
   */
  isInvalidAndNotTouched(controlName: string): boolean {
    const control = this.requestForm().get(controlName);
    return control!.invalid && control!.touched;
  }

  /**
   * Sets the value of a form control
   * @param {string} controlName
   * @param {any} value
   */
  setValue(controlName: string, value: any, isReason = false): void {
    this.requestForm().get(controlName)!.setValue(value);
    this.requestForm().get(controlName)!.markAsTouched();
    if (isReason) {
      this.requestForm().get('file')!.reset();
      this.fileName.set(null);
    }
  }

  /**
   * Handles the file selection event
   * @param {Event} event - The file selection event
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.requestForm().patchValue({ file: file });
      this.requestForm().get('file')!.markAsTouched();
      this.fileName.set(file.name);
    }
  }

  /**
   * Triggers the file upload dialog
   */
  triggerFileUpload(): void {
    const fileInput = document.getElementById('cvUpload') as HTMLInputElement;
    fileInput.click();
  }

  sendRequest(): void {
    this.requestForm().markAllAsTouched();
    if (this.requestForm().invalid) return;
  }
}
