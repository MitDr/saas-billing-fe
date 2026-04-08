import {Component, inject, input, output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-portal-subscriber-reuse-form',
  imports: [
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzColDirective,
    NzRowDirective,
    NzFormControlComponent,
    NzInputDirective,
    NzButtonComponent,
    NzFormDirective
  ],
  templateUrl: './portal-subscriber-reuse-form.html',
  styleUrl: './portal-subscriber-reuse-form.css',
})
export class PortalSubscriberReuseForm {
  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Subscriber');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false);
  submitted = output<void>();
  private message = inject(NzMessageService);

  get name() {
    return this.formGroup()?.get('name')
  }

  get email() {
    return this.formGroup()?.get('email')
  }

  onSubmit(): void {
    const form = this.formGroup();
    if (form?.valid) {
      this.submitted.emit();
    } else {
      Object.values(form?.controls || {}).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
      this.message.warning('Please double-check the information!');
    }
  }
}
