import {Component, inject, input, output} from '@angular/core';
import {OptionInterface} from '../../../../../core/interface/option-interface';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';

@Component({
  selector: 'app-auth-payout-reuse-form',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzCardMetaComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzIconDirective,
    NzInputDirective,
    NzModalComponent,
    NzModalContentDirective,
    NzOptionComponent,
    NzRowDirective,
    NzSelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './auth-payout-reuse-form.html',
  styleUrl: './auth-payout-reuse-form.css',
})
export class AuthPayoutReuseForm {
  currencyOption: OptionInterface[] = [
    {label: 'USD', value: 'USD'},
  ];

  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Payout');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false);
  submitted = output<void>();
  fb = inject(NonNullableFormBuilder);
  private message = inject(NzMessageService);

  get amount() {
    return this.formGroup()?.get('amount')
  }

  get currency() {
    return this.formGroup()?.get('currency')
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
