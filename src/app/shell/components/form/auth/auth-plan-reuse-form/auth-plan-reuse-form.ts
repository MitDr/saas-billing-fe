import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzTagComponent} from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-auth-plan-reuse-form',
  imports: [
    FormsModule,
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
    NzOptionComponent,
    NzRowDirective,
    NzSelectComponent,
    NzTagComponent,
    ReactiveFormsModule
  ],
  templateUrl: './auth-plan-reuse-form.html',
  styleUrl: './auth-plan-reuse-form.css',
})
export class AuthPlanReuseForm {
  // statusOption: OptionInterface[] = [
  //   {label: 'Active', value: 'ACTIVE'},
  //   {label: 'Deactivated', value: 'DEACTIVATED'},
  //   {label: 'Cancel', value: 'CANCEL'}
  // ]
  //
  // formGroup = input.required<FormGroup>();
  // submitLabel = input<string>('Create Plan');
  // isLoading = input<boolean>(false);
  // isEditMode = input<boolean>(false);
  // submitted = output<void>();
  // fb = inject(NonNullableFormBuilder);
  // availablePlanGroups = input<AuthPlanGroup[]>([]);
  // selectedPlanGroup = signal<AuthPlanGroup | null>(null);
  // initPlanGroup = input<AuthPlanGroup | null>();
  // availableFeatures = input<AuthFeature[]>([]);
  // selectedFeatures = signal<AuthFeature[]>([]);
  // initFeatures = input<AuthFeature[] | null>();
  // availablePrices = input<AuthPrice[]>([]);
  // selectedPrices = signal<AuthPrice[]>([]);
  // initPrices = input<AuthPrice[] | null>();
  //
  //
  // isPlanGroupModalOpen = signal(false);
  // isFeatureModalOpen = signal(false);
  // isPriceModalOpen = signal(false);
  //
  // private message = inject(NzMessageService);
  //
  // constructor() {
  //   effect(() => {
  //     this.selectedFeatures.set(this.initFeatures() || []);
  //     this.selectedPrices.set(this.initPrices() || []);
  //     this.selectedPlanGroup.set(this.initPlanGroup() || null);
  //   });
  // }
  //
  // get name() {
  //   return this.formGroup()?.get('name');
  // }
  //
  // get image() {
  //   return this.formGroup()?.get('image');
  // }
  //
  // get status() {
  //   return this.formGroup()?.get('status');
  // }
  //
  // get planGroupId() {
  //   return this.formGroup()?.get('planGroupId');
  // }
  //
  // get features() {
  //   return this.formGroup()?.get('features');
  // }
  //
  // get prices() {
  //   return this.formGroup()?.get('prices');
  // }
  //
  // openPlanGroupModal() {
  //   this.isPlanGroupModalOpen.set(true);
  // }
  //
  // selectPlanGroup(planGroup: AuthPlanGroup) {
  //   this.selectedPlanGroup.set(planGroup);
  //   this.planGroupId?.setValue(planGroup.id);
  //   this.isPlanGroupModalOpen.set(false);
  // }
  //
  // clearPlanGroup() {
  //   this.selectedPlanGroup.set(null);
  //   this.planGroupId?.setValue(null);
  // }
  //
  // openFeatureModal() {
  //   this.isFeatureModalOpen.set(true);
  // }
  //
  // isFeatureSelected(featureId: number): boolean {
  //   return this.selectedFeatures().some(u => u.id === featureId);
  // }
  //
  // toggleFeature(feature: AuthFeature) {
  //   const current = this.selectedFeatures();
  //   if (current.some(u => u.id === feature.id)) {
  //     this.selectedFeatures.set(current.filter(u => u.id !== feature.id));
  //   } else {
  //     this.selectedFeatures.set([...current, feature]);
  //   }
  //   this.features?.setValue(this.selectedFeatures().map(u => u.id));
  // }
  //
  // removeSelectedFeature(featureId: number) {
  //   this.selectedFeatures.set(this.selectedFeatures().filter(u => u.id !== featureId));
  //   this.features?.setValue(this.selectedFeatures().map(u => u.id));
  // }
  //
  // openPriceModal() {
  //   this.isPriceModalOpen.set(true);
  // }
  //
  // isPriceSelected(priceId: number): boolean {
  //   return this.selectedPrices().some(u => u.id === priceId);
  // }
  //
  // togglePrice(price: AuthPrice) {
  //   const current = this.selectedPrices();
  //   if (current.some(u => u.id === price.id)) {
  //     this.selectedPrices.set(current.filter(u => u.id !== price.id));
  //   } else {
  //     this.selectedPrices.set([...current, price]);
  //   }
  //   this.prices?.setValue(this.selectedPrices().map(u => u.id));
  // }
  //
  // removeSelectedPrice(priceId: number) {
  //   this.selectedPrices.set(this.selectedPrices().filter(u => u.id !== priceId));
  //   this.prices?.setValue(this.selectedPrices().map(u => u.id));
  // }
  //
  // onSubmit(): void {
  //   const form = this.formGroup();
  //   if (form?.valid) {
  //     this.submitted.emit();
  //   } else {
  //     Object.values(form?.controls || {}).forEach(control => {
  //       if (control.invalid) {
  //         control.markAsDirty();
  //         control.updateValueAndValidity({onlySelf: true});
  //       }
  //     });
  //     this.message.warning('Vui lòng kiểm tra lại thông tin!');
  //   }
  // }
  //
  // getFeatureDescription(fe: AuthFeature): string {
  //   return `
  //   ${fe.id}-${fe.name}
  //   Description: ${fe.description}
  //   Status: ${fe.status}
  // `;
  // }
  //
  // getPriceDescription(pr: AuthPrice): string {
  //   return `
  //   ${pr.id}
  //   ${pr.price} ${pr.currency}
  //   Status: ${pr.status}
  // `;
  // }
}
