import {Component, effect, inject, input, output, signal} from '@angular/core';
import {FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {PlanGroup} from '../../../../../core/interface/entity/plan-group';
import {Feature} from '../../../../../core/interface/entity/feature';
import {Price} from '../../../../../core/interface/entity/price';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {OptionInterface} from '../../../../../core/interface/option-interface';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'app-plan-reuse-form',
  imports: [
    FormsModule,
    NzFormDirective,
    ReactiveFormsModule,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzRowDirective,
    NzOptionComponent,
    NzSelectComponent,
    NzButtonComponent,
    NzCardComponent,
    NzCardMetaComponent,
    NzIconDirective,
    NzModalComponent,
    NzModalContentDirective,
    NzTagComponent,
    NzCheckboxComponent
  ],
  templateUrl: './plan-reuse-form.html',
  styleUrl: './plan-reuse-form.css',
})
export class PlanReuseForm {
  statusOption: OptionInterface[] = [
    {label: 'Active', value: 'ACTIVE'},
    {label: 'Deactivated', value: 'DEACTIVATED'},
    {label: 'Cancel', value: 'CANCEL'}
  ]

  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Plan');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false);
  submitted = output<void>();
  fb = inject(NonNullableFormBuilder);

  availableTenants = input<Tenant[]>([]);
  selectedTenant = signal<Tenant | null>(null);
  initTenant = input<Tenant | null>();
  availablePlanGroups = input<PlanGroup[]>([]);
  selectedPlanGroup = signal<PlanGroup | null>(null);
  initPlanGroup = input<PlanGroup | null>();
  availableFeatures = input<Feature[]>([]);
  selectedFeatures = signal<Feature[]>([]);
  initFeatures = input<Feature[] | null>();
  availablePrices = input<Price[]>([]);
  selectedPrices = signal<Price[]>([]);
  initPrices = input<Price[] | null>();

  isTenantModalOpen = signal(false);
  isPlanGroupModalOpen = signal(false);
  isFeatureModalOpen = signal(false);
  isPriceModalOpen = signal(false);

  private message = inject(NzMessageService);


  constructor() {
    effect(() => {
      this.selectedTenant.set(this.initTenant() || null);
      this.selectedFeatures.set(this.initFeatures() || []);
      this.selectedPrices.set(this.initPrices() || []);
      this.selectedPlanGroup.set(this.initPlanGroup() || null);
    });
  }

  get name() {
    return this.formGroup()?.get('name');
  }

  get image() {
    return this.formGroup()?.get('image');
  }

  get status() {
    return this.formGroup()?.get('status');
  }

  get planGroupId() {
    return this.formGroup()?.get('planGroupId');
  }

  get features() {
    return this.formGroup()?.get('features');
  }

  get prices() {
    return this.formGroup()?.get('prices');
  }

  get tenantId() {
    return this.formGroup()?.get('tenantId');
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

  openPlanGroupModal() {
    this.isPlanGroupModalOpen.set(true);
  }

  selectPlanGroup(planGroup: PlanGroup) {
    this.selectedPlanGroup.set(planGroup);
    this.planGroupId?.setValue(planGroup.id);
    this.isPlanGroupModalOpen.set(false);
  }

  clearPlanGroup() {
    this.selectedPlanGroup.set(null);
    this.planGroupId?.setValue(null);
  }

  openFeatureModal() {
    this.isFeatureModalOpen.set(true);
  }

  isFeatureSelected(featureId: number): boolean {
    return this.selectedFeatures().some(u => u.id === featureId);
  }

  toggleFeature(feature: Feature) {
    const current = this.selectedFeatures();
    if (current.some(u => u.id === feature.id)) {
      this.selectedFeatures.set(current.filter(u => u.id !== feature.id));
    } else {
      this.selectedFeatures.set([...current, feature]);
    }
    this.features?.setValue(this.selectedFeatures().map(u => u.id));
  }

  removeSelectedFeature(featureId: number) {
    this.selectedFeatures.set(this.selectedFeatures().filter(u => u.id !== featureId));
    this.features?.setValue(this.selectedFeatures().map(u => u.id));
  }

  openPriceModal() {
    this.isPriceModalOpen.set(true);
  }

  isPriceSelected(priceId: number): boolean {
    return this.selectedPrices().some(u => u.id === priceId);
  }

  togglePrice(price: Price) {
    const current = this.selectedPrices();
    if (current.some(u => u.id === price.id)) {
      this.selectedPrices.set(current.filter(u => u.id !== price.id));
    } else {
      this.selectedPrices.set([...current, price]);
    }
    this.prices?.setValue(this.selectedPrices().map(u => u.id));
  }

  removeSelectedPrice(priceId: number) {
    this.selectedPrices.set(this.selectedPrices().filter(u => u.id !== priceId));
    this.prices?.setValue(this.selectedPrices().map(u => u.id));
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

  getFeatureDescription(fe: Feature): string {
    return `
    ${fe.id}-${fe.name}
    Description: ${fe.description}
    Status: ${fe.status}
    Tenant: ${fe.tenant?.name}
  `;
  }

  getPriceDescription(pr: Price): string {
    return `
    ${pr.id}
    ${pr.price} ${pr.currency}
    Status: ${pr.status}
    Tenant: ${pr.tenant?.name}
  `;
  }
}
