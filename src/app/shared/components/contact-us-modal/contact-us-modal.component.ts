import { Component, computed, effect, inject, signal } from '@angular/core';
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
import { SanityService } from '../../../core/services/sanity.service';
import { ContactRequestBody } from './interfaces/contact-request-body';
import { fadeInOutTrigger } from '../../animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ac-contact-us-modal',
  imports: [
    Tabs,
    Tab,
    Button,
    Text,
    Number,
    Textarea,
    Select,
    Option,
    RouterLink,
  ],
  templateUrl: './contact-us-modal.component.html',
  styleUrl: './contact-us-modal.component.css',
  animations: [fadeInOutTrigger],
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
      reason: new FormControl<BusinessRequestReason | null>(null, [
        Validators.required,
      ]),
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
  loading = signal<boolean>(false);
  applied = signal<boolean>(false);
  sanityService = inject(SanityService);

  constructor() {
    effect(() => {
      this.resetFormFields();
    });
  }

  /**
   * Resets the form fields
   */
  resetFormFields(): void {
    const form = this.requestForm();
    const isCandidate = this.selectedRequestType() === RequestType.Candidate;

    form.get('companyName')!.reset();
    form.get('position')!.reset();
    form.get('reason')!.reset();
    form.get('file')!.reset();
    form.markAsUntouched();
    this.fileName.set(null);

    if (isCandidate) {
      form.get('companyName')!.disable();
      form.get('position')!.disable();
      form.get('reason')!.disable();
      form.get('file')!.enable();
    } else {
      form.get('companyName')!.enable();
      form.get('position')!.enable();
      form.get('reason')!.enable();
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
    const control = this.requestForm().get(controlName);
    control!.setValue(value);
    control!.markAsTouched();

    if (isReason && this.selectedRequestType() === RequestType.Business) {
      const fileControl = this.requestForm().get('file');
      fileControl!.reset();

      if (value === BusinessRequestReason.Information) {
        fileControl!.disable();
        this.fileName.set(null);
      } else {
        fileControl!.enable();
      }
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

  /**
   * Sends the request to the server
   * @returns {Promise<void>} - The result of the request
   */
  async sendRequest(): Promise<void> {
    this.requestForm().markAllAsTouched();
    if (this.requestForm().invalid) return;
    this.loading.set(true);

    let asset = null;
    let document: ContactRequestBody;

    if (this.requestForm().value.file) {
      asset = await this.sanityService.uploadFile(
        this.requestForm().value.file
      );
    }
    try {
      if (this.selectedRequestType() === RequestType.Candidate) {
        document = {
          _type: 'candidateRequest',
          firstName: this.requestForm().value.firstName,
          lastName: this.requestForm().value.lastName,
          phone: this.requestForm().value.phone as number,
          email: this.requestForm().value.email,
          extraInfo: this.requestForm().value.extraInfo,
          cv: {
            _type: 'file',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          },
        };
      } else {
        document = {
          _type: 'businessRequest',
          firstName: this.requestForm().value.firstName,
          lastName: this.requestForm().value.lastName,
          companyName: this.requestForm().value.companyName,
          position: this.requestForm().value.position,
          phone: this.requestForm().value.phone as number,
          email: this.requestForm().value.email,
          reason: this.requestForm().value.reason,
          extraInfo: this.requestForm().value.extraInfo,
        };
        if (asset) {
          document.jobDescription = {
            _type: 'file',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          };
        }
      }
      await this.sanityService.postDocument(document);
      this.applied.set(true);
    } catch (error) {
      console.error('Error while sending the request', error);
    } finally {
      this.loading.set(false);
    }
  }
}
