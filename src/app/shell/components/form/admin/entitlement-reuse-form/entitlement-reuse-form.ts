import {Component, effect, inject, input, output, signal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';
import {OptionInterface} from '../../../../../core/interface/option-interface';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {Feature} from '../../../../../core/interface/entity/feature';
import {Subscription} from '../../../../../core/interface/entity/subscription';

@Component({
  selector: 'app-entitlement-reuse-form',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzCardMetaComponent,
    NzCheckboxComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzIconDirective,
    NzInputDirective,
    NzModalComponent,
    NzModalContentDirective,
    NzPopconfirmDirective,
    NzRowDirective,
    NzTagComponent,
    NzTooltipDirective,
    ReactiveFormsModule,
    NzDatePickerComponent,
    NzOptionComponent,
    NzSelectComponent,
  ],
  templateUrl: './entitlement-reuse-form.html',
  styleUrl: './entitlement-reuse-form.css',
})
export class EntitlementReuseForm {
  options: OptionInterface[] = [
    {label: 'Active', value: 'ACTIVE'},
    {label: 'Expired', value: 'EXPIRED'},
    {label: 'Revoked', value: 'REVOKED'}
  ];
  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Entitlement');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false);
  submitted = output<void>();
  // Danh sách user có sẵn (truyền từ parent)
  availableTenants = input<Tenant[]>([]);
  selectedTenant = signal<Tenant | null>(null);
  initTenant = input<Tenant | null>();
  availableFeatures = input<Feature[]>([]);
  selectedFeature = signal<Feature | null>(null);
  initFeature = input<Feature | null>();
  availableSubscription = input<Subscription[]>([]);
  selectedSubscription = signal<Subscription | null>(null);
  initSubscription = input<Subscription | null>();
  // Signals quản lý lựa chọn
  // Modal visibility
  isTenantModalOpen = signal(false);
  isFeatureModalOpen = signal(false);
  isSubscriptionModalOpen = signal(false);
  private message = inject(NzMessageService);

  constructor() {
    effect(() => {
      this.selectedTenant.set(this.initTenant() || null);
      this.selectedFeature.set(this.initFeature() || null);
      this.selectedSubscription.set(this.initSubscription() || null);
    });
  }

  get featureId() {
    return this.formGroup()?.get('featureId')
  }

  get startDate() {
    return this.formGroup()?.get('startDate')
  }

  get endDate() {
    return this.formGroup()?.get('endDate')
  }

  get status() {
    return this.formGroup()?.get('status')
  }

  get subscriptionId() {
    return this.formGroup()?.get('subscriptionId')
  }

  get tenantId() {
    return this.formGroup()?.get('tenantId')
  }

  openTenantModal() {
    this.isTenantModalOpen.set(true);
  }

  selectTenant(tenant: Tenant) {
    this.selectedTenant.set(tenant);
    this.tenantId?.setValue(tenant.id);
    this.isTenantModalOpen.set(false);
  }

  clearTenant() {
    this.selectedTenant.set(null);
    this.tenantId?.setValue(null);
  }

  openFeatureModal() {
    this.isFeatureModalOpen.set(true);
  }

  selectFeature(feature: Feature) {
    this.selectedFeature.set(feature);
    this.featureId?.setValue(feature.id);
    this.isFeatureModalOpen.set(false);
  }

  clearFeature() {
    this.selectedFeature.set(null);
    this.featureId?.setValue(null);
  }

  openSubscriptionModal() {
    this.isSubscriptionModalOpen.set(true);
  }

  selectSubscription(subscription: Subscription) {
    this.selectedSubscription.set(subscription);
    this.subscriptionId?.setValue(subscription.id);
    this.isSubscriptionModalOpen.set(false);
  }

  clearSubscription() {
    this.selectedSubscription.set(null);
    this.subscriptionId?.setValue(null);
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

  getSubscriptionDescription(sub: Subscription): string {
    return `
    ${sub.status} • Trial: ${sub.trial}
    Start Date: ${sub.startDate}
    End Date: ${sub.endDate}
    Subscriber: ${sub.subscriber?.name}
    Tenant: ${sub.tenant?.name}
  `;
  }

  getFeatureDescription(feat: Feature): string {
    return `
    ${feat.id} •  ${feat.description}
    Tenant: ${feat.tenant?.name}
  `;
  }


}
