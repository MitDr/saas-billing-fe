import {Component, effect, inject, input, output, signal} from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Price} from '../../../../../core/interface/entity/price';
import { Subscriber } from "../../../../../core/interface/entity/subscriber";
import {NzMessageService} from 'ng-zorro-antd/message';
import {OptionInterface} from '../../../../../core/interface/option-interface';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';
import {Invoice} from '../../../../../core/interface/entity/invoice';

@Component({
  selector: 'app-subscription-reuse-form',
  imports: [
    FormsModule,
    NzFormDirective,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzOptionComponent,
    NzRowDirective,
    NzSelectComponent,
    ReactiveFormsModule,
    NzInputDirective,
    NzCheckboxComponent,
    NzDatePickerComponent
  ],
  templateUrl: './subscription-reuse-form.html',
  styleUrl: './subscription-reuse-form.css',
})
export class SubscriptionReuseForm {
  statusOption: OptionInterface[] = [
    {label: 'Active', value: 'ACTIVE'},
    {label: 'Draft', value: 'DRAFT'},
    {label: 'Pending', value: 'PENDING'},
    {label: 'Ended', value: 'ENDED'},
    {label: 'Cancel', value: 'CANCEL'}
  ]

  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Feature');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false);
  submitted = output<void>();
  fb = inject(NonNullableFormBuilder);


  availableTenants = input<Tenant[]>([]);
  selectedTenant = signal<Tenant | null>(null);
  initTenant = input<Tenant | null>();

  availablePrice = input<Price[]>([]);
  selectedPrice = signal<Price | null>(null);
  initPrice = input<Price | null>();

  availableInvoice = input<Invoice[]>([]);
  selectedInvoice = signal<Invoice[]>([]);
  initInvoice = input<Invoice[]>();


  availableSubscriber = input<Subscriber[]>([]);
  selectedSubscriber = signal<Subscriber | null>(null);
  initSubscriber = input<Subscriber | null>();

  isTenantModalOpen = signal(false);
  isPriceModalOpen = signal(false);
  isSubscriberModalOpen = signal(false);
  isInvoiceModalOpenn = signal(false);

  private message = inject(NzMessageService);

  constructor() {
    effect(() => {
      this.selectedTenant.set(this.initTenant() || null);
      this.selectedSubscriber.set(this.initSubscriber() || null);
      this.selectedPrice.set(this.initPrice() || null);
      this.selectedInvoice.set(this.initInvoice() || []);
    });
  }

  get status(){
    return this.formGroup().get('status')
  }
  get defaultPaymentMethod(){
    return this.formGroup().get('defaultPaymentMethod')
  }
  get quantity(){
    return this.formGroup().get('quantity')
  }
  get isTrial(){
    return this.formGroup().get('isTrial')
  }
  get startDate(){
    return this.formGroup().get('startDate')
  }
  get endDate(){
    return this.formGroup().get('endDate')
  }
  get cancelAtPeriodEnd(){
    return this.formGroup().get('cancelAtPeriodEnd')
  }
  get cancelDate(){
    return this.formGroup().get('cancelDate')
  }
  get dueDate(){
    return this.formGroup().get('dueDate')
  }
  get subscriberId(){
    return this.formGroup().get('subscriberId')
  }
  get priceId(){
    return this.formGroup().get('invoices')
  }
  get tenantId(){
    return this.formGroup().get('tenantId')
  }

  get invoices(){
    return this.formGroup().get('invoices');
  }
  get metadata(){
    return this.formGroup().get('metadata')
  }

  get metadataList(): FormArray {
    return this.formGroup()?.get('metadata') as FormArray;
  }

  addMetadata() {
    const group = this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    });
    this.metadataList.push(group);
  }

  removeMetadata(index: number) {
    this.metadataList.removeAt(index);
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

  openPriceModal() {
    this.isPriceModalOpen.set(true);
  }

  selectPrice(price: Price) {
    this.selectedPrice.set(price);
    this.priceId?.setValue(price.id);
    this.isPriceModalOpen.set(false);
  }

  clearPrice() {
    this.selectedPrice.set(null);
    this.priceId?.setValue(null);
  }

  openSubscriberModal() {
    this.isSubscriberModalOpen.set(true);
  }

  selectSubscriber(subscriber: Subscriber) {
    this.selectedSubscriber.set(subscriber);
    this.subscriberId?.setValue(subscriber.id);
    this.isSubscriberModalOpen.set(false);
  }

  clearSubscriber() {
    this.selectedSubscriber.set(null);
    this.subscriberId?.setValue(null);
  }

  openInvoiceModal() {
    this.isInvoiceModalOpenn.set(true);
  }

  isInvoiceSelected(invoiceId: number): boolean {
    return this.selectedInvoice().some(u => u.id === invoiceId);
  }

  togglePrice(invoice: Invoice) {
    const current = this.selectedInvoice();
    if (current.some(u => u.id === invoice.id)) {
      this.selectedInvoice.set(current.filter(u => u.id !== invoice.id));
    } else {
      this.selectedInvoice.set([...current, invoice]);
    }
    this.invoices?.setValue(this.selectedInvoice().map(u => u.id));
  }

  removeSelectedInvoice(invoiceId: number) {
    this.selectedInvoice.set(this.selectedInvoice().filter(u => u.id !== invoiceId));
    this.invoices?.setValue(this.selectedInvoice().map(u => u.id));
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

  getPriceDescription(pr: Price): string {
    return `
    ${pr.id}
    ${pr.price} ${pr.currency}
    Status: ${pr.status}
    Tenant: ${pr.tenant?.name}
  `;
  }
  getInvoiceDescription(inv: Invoice): string {
    return `
    ${inv.invoiceNumber}
    Subscription: ${inv.subscription?.id}
    Subscriber: ${inv.subscriber?.name} - ${inv.subscriber?.email}
    Tenant: ${inv.tenant?.name}
  `;
  }
}
