import {Component, computed, effect, inject, input, output, signal} from '@angular/core';
import {FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
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
import {OptionInterface} from '../../../../../core/interface/option-interface';
import {AuthPlanGroup} from '../../../../../core/interface/entity/auth/auth-plan-group';
import {AuthFeature} from '../../../../../core/interface/entity/auth/auth-feature';
import {AuthPrice} from '../../../../../core/interface/entity/auth/auth-price';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzUploadChangeParam, NzUploadComponent, NzUploadFile} from 'ng-zorro-antd/upload';

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
    ReactiveFormsModule,
    NzUploadComponent
  ],
  templateUrl: './auth-plan-reuse-form.html',
  styleUrl: './auth-plan-reuse-form.css',
})
export class AuthPlanReuseForm {
  statusOption: OptionInterface[] = [
    {label: 'Active', value: 'ACTIVE'},
    {label: 'Deactivated', value: 'DEACTIVATED'},
    {label: 'Cancel', value: 'CANCEL'}
  ]
  //
  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Plan');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false);
  submitted = output<void>();
  fb = inject(NonNullableFormBuilder);
  availablePlanGroups = input<AuthPlanGroup[]>([]);
  selectedPlanGroup = signal<AuthPlanGroup | null>(null);
  initPlanGroup = input<AuthPlanGroup | null>();
  availableFeatures = input<AuthFeature[]>([]);
  selectedFeatures = signal<AuthFeature[]>([]);
  initFeatures = input<AuthFeature[] | null>();
  availablePrices = input<AuthPrice[]>([]);
  selectedPrices = signal<AuthPrice[]>([]);
  initPrices = input<AuthPrice[] | null>();
  initialImageUrl = input<string | null>(null);

  imageFileList = signal<NzUploadFile[]>([]); // danh sách file (nz-upload dùng mảng)
  imagePreview = signal<string | null>(null);

  fileSizeKB = computed(() => {
    const file = this.imageFileList()[0];
    if (!file || !file.size) return null;
    return (file.size / 1024).toFixed(2);
  });

  isPlanGroupModalOpen = signal(false);
  isFeatureModalOpen = signal(false);
  isPriceModalOpen = signal(false);
  canSubmit = computed(() => {
    return this.formGroup()?.valid && this.imageFileList().length > 0;
  });
  //
  private message = inject(NzMessageService);

  //
  constructor() {
    effect(() => {
      this.selectedFeatures.set(this.initFeatures() || []);
      this.selectedPrices.set(this.initPrices() || []);
      this.selectedPlanGroup.set(this.initPlanGroup() || null);

      if (this.isEditMode() && this.initialImageUrl()) {
        this.imagePreview.set(this.initialImageUrl()!);
      }
    });
  }

  //
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

  // get imageFile(): File | null {
  //   const file = this.imageFileList()[0]?.originFileObj;
  //   return file instanceof File ? file : null;
  // }
  get imageFile(): File | undefined {
    const file = this.imageFileList()[0]?.originFileObj;
    return file instanceof File ? file : undefined;  // thay vì null
  }

  clearImage() {
    if (this.imagePreview()) {
      URL.revokeObjectURL(this.imagePreview()!);
      console.log('Revoked object URL:', this.imagePreview());
    }
    this.imageFileList.set([]);
    this.imagePreview.set(null);
    this.image?.setValue('');
  }

  handleImageChange(info: NzUploadChangeParam): void {
    console.log('nzChange trigger lần:', info);

    let fileList = info.fileList;
    if (fileList.length > 1) {
      fileList = fileList.slice(-1);
    }
    this.imageFileList.set(fileList);

    const file = fileList[0];
    if (file?.originFileObj) {
      const originFile = file.originFileObj;


      // Preview dùng object URL (nhanh, không warning 404)
      if (!this.imagePreview()) {
        const objectURL = URL.createObjectURL(originFile);
        this.imagePreview.set(objectURL);
        console.log('Preview object URL created:', objectURL);
      }

      // Validate
      if (!originFile.type.startsWith('image/')) {
        this.message.error('Image Only');
        this.clearImage();
        return;
      }
      if (originFile.size > 10 * 1024 * 1024) {
        this.message.error('File maximum 10MB');
        this.clearImage();
        return;
      }

      this.image?.setValue(originFile.name);
    }
  }

  //
  openPlanGroupModal() {
    this.isPlanGroupModalOpen.set(true);
  }

  selectPlanGroup(planGroup: AuthPlanGroup) {
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

  //
  toggleFeature(feature: AuthFeature) {
    const current = this.selectedFeatures();
    if (current.some(u => u.id === feature.id)) {
      this.selectedFeatures.set(current.filter(u => u.id !== feature.id));
    } else {
      this.selectedFeatures.set([...current, feature]);
    }
    this.features?.setValue(this.selectedFeatures().map(u => u.id));
  }

  //
  removeSelectedFeature(featureId: number) {
    this.selectedFeatures.set(this.selectedFeatures().filter(u => u.id !== featureId));
    this.features?.setValue(this.selectedFeatures().map(u => u.id));
  }

  //
  openPriceModal() {
    this.isPriceModalOpen.set(true);
  }

  //
  isPriceSelected(priceId: number): boolean {
    return this.selectedPrices().some(u => u.id === priceId);
  }

  //
  togglePrice(price: AuthPrice) {
    const current = this.selectedPrices();
    if (current.some(u => u.id === price.id)) {
      this.selectedPrices.set(current.filter(u => u.id !== price.id));
    } else {
      this.selectedPrices.set([...current, price]);
    }
    this.prices?.setValue(this.selectedPrices().map(u => u.id));
  }

  //
  removeSelectedPrice(priceId: number) {
    this.selectedPrices.set(this.selectedPrices().filter(u => u.id !== priceId));
    this.prices?.setValue(this.selectedPrices().map(u => u.id));
  }

  //
  onSubmit(): void {

    const file = this.imageFile;

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

  //
  getFeatureDescription(fe: AuthFeature): string {
    return `
    ${fe.id}-${fe.name}\n
    Description: ${fe.description}\n
    Status: ${fe.status}
  `;
  }

  getPriceDescription(pr: AuthPrice): string {
    return `Id: ${pr.id}
    ${pr.price} ${pr.currency}
    Status: ${pr.status}
    Plan: ${pr.plan?.name ?? 'No Plan Yet'}
  `;
  }

  beforeUploadImage = (file: NzUploadFile): boolean => {
    if (!file.type?.startsWith('image/')) {
      this.message.error('Image Only');
      return false;
    }
    if (file.size! > 10 * 1024 * 1024) {
      this.message.error('Maximum 10MB');
      return false;
    }
    return true;
  };
}
