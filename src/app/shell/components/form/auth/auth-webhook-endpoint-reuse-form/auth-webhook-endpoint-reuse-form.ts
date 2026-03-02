import {Component, inject, input, output} from '@angular/core';
import {OptionInterface} from '../../../../../core/interface/option-interface';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective} from 'ng-zorro-antd/input';

@Component({
  selector: 'app-auth-webhook-endpoint-reuse-form',
  imports: [
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzSelectComponent,
    NzColDirective,
    NzOptionComponent,
    NzButtonComponent,
    NzRowDirective,
    NzInputDirective,
    NzFormDirective
  ],
  templateUrl: './auth-webhook-endpoint-reuse-form.html',
  styleUrl: './auth-webhook-endpoint-reuse-form.css',
})
export class AuthWebhookEndpointReuseForm {
  options: OptionInterface[] = [
    {value: 'ACTIVE', label: 'Active'},
    {value: 'DISABLED', label: 'Disable'},
  ];

  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Webhook Endpoint');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false);
  submitted = output<void>();
  private message = inject(NzMessageService);

  get url(){
    return this.formGroup()?.get('url')
  }
  get status(){
    return this.formGroup()?.get('status')
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
      this.message.warning('Vui lòng kiểm tra lại thông tin!');
    }
  }
}
