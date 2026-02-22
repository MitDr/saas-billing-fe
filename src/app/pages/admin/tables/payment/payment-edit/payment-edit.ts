import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Invoice} from '../../../../../core/interface/entity/invoice';
import {TenantService} from '../../../../../core/service/tenant-service';
import {InvoiceService} from '../../../../../core/service/invoice-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {PAYMENT_ROUTE_CONSTANT} from '../../../../../core/constant/payment/payment-list-constant';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormArray, NonNullableFormBuilder, Validators} from '@angular/forms';
import {Payment} from '../../../../../core/interface/entity/payment';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {PaymentService} from '../../../../../core/service/payment-service';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {InvoiceReuseForm} from '../../../../../shell/components/form/admin/invoice-reuse-form/invoice-reuse-form';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {PaymentReuseForm} from '../../../../../shell/components/form/admin/payment-reuse-form/payment-reuse-form';
import {PaymentRequest} from '../../../../../core/interface/request/payment-request';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-payment-edit',
  imports: [
    NzModalModule,
    Breadcrumb,
    InvoiceReuseForm,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    PaymentReuseForm,
  ],
  templateUrl: './payment-edit.html',
  styleUrl: './payment-edit.css',
})
export class PaymentEdit implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  availableInvoice = signal<Invoice[]>([]);

  routing = PAYMENT_ROUTE_CONSTANT;
  tenantService = inject(TenantService);
  invoiceService = inject(InvoiceService)
  paymentService = inject(PaymentService)
  message = inject(NzMessageService);

  initInvoice = signal<Invoice | null>(null);
  initTenant = signal<Tenant | null>(null);

  payment = signal<Payment | null>(null);
  loading = signal(false);
  isSubmitting = false;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  paymentForm = this.fb.group({
    amount: [null as number | null, Validators.required],
    currency: ['', Validators.required],
    status: ['', Validators.required],
    paymentIntentId: [''],
    chargeId: ['',],
    balanceTransactionId: [''],
    paymentMethod: [''],
    availableOn: [null as Date | null],
    invoiceId: [null as number | null],
    tenantId: [null as number | null, Validators.required],
    metadata: this.fb.array([])
  })

  constructor() {
    // Load user khi có id từ route
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadPayment(+id);
      }
    });
    effect(() => {
      const currentInvoice = this.payment();
      if (currentInvoice) {
        console.log(currentInvoice)
        this.paymentForm.patchValue({
          amount: currentInvoice.amount,
          currency: currentInvoice.currency,
          status: currentInvoice.status,
          paymentIntentId: currentInvoice.paymentIntentId,
          chargeId: currentInvoice.chargeId,
          balanceTransactionId: currentInvoice.balanceTransactionId,
          paymentMethod: currentInvoice.paymentMethod,
          availableOn: this.parseDate(currentInvoice.availableOn),
          // metadata: currentInvoice.metadata
        });
        this.patchMetadata(currentInvoice.metadata);
        this.getTenant(currentInvoice?.tenant.id);
        if (currentInvoice?.invoice) {
          this.getInvoice(currentInvoice?.invoice?.id!);
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadAllTenant();
    this.loadAllInvoice();
  }

  loadPayment(id: number) {
    this.loading.set(true);
    this.paymentService.getPayment(id).subscribe({
      next: (response) => {
        this.payment.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  onSubmitted() {
    console.log(this.paymentForm.value)
    if (this.paymentForm.valid) {
      this.isSubmitting = true;

      const raw = this.paymentForm.value;

      // Convert metadata array -> object
      const metadataObject: any = {};

      if (raw.metadata && raw.metadata.length > 0) {
        raw.metadata.forEach((item: any) => {
          if (item.key) {
            metadataObject[item.key] = item.value;
          }
        });
      }

      const payload: PaymentRequest = {
        amount: this.paymentForm.value.amount!,
        currency: this.paymentForm.value.currency! as 'USD' | 'VND',
        status: this.paymentForm.value.status! as 'PENDING' | 'AVAILABLE' | 'REFUNDED',
        tenantId: this.paymentForm.value.tenantId!,
      };

      if (this.paymentForm.value.paymentIntentId) {
        const paymentIntentId = this.paymentForm.value.paymentIntentId as string;
        Object.assign(payload, {paymentIntentId})
      }
      if (this.paymentForm.value.chargeId) {
        const chargeId = this.paymentForm.value.chargeId as string;
        Object.assign(payload, {chargeId})
      }
      if (this.paymentForm.value.balanceTransactionId) {
        const balanceTransactionId = this.paymentForm.value.balanceTransactionId as string;
        Object.assign(payload, {balanceTransactionId})
      }
      if (this.paymentForm.value.paymentMethod) {
        const paymentMethod = this.paymentForm.value.paymentMethod as string;
        Object.assign(payload, {paymentMethod})
      }
      if (this.paymentForm.value.invoiceId) {
        const paymentMethod = this.paymentForm.value.invoiceId as number;
        Object.assign(payload, {paymentMethod})
      }
      if (Object.keys(metadataObject).length === 0) {
        delete payload.metadata;
      }

      if (this.paymentForm.value.availableOn) {
        if (this.paymentForm.value.availableOn) {
          const availableOn = this.formatDateString(this.paymentForm.value.availableOn, 'dd-MM-yyyy HH:mm:ss')
          Object.assign(payload, {availableOn});
        }
      }

      console.log(payload)
      this.paymentService.update(payload, this.payment()?.id!).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Update payment thành công');
          this.paymentForm.reset();
          this.router.navigate(['/admin/tables/payments']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Update payment failed:', err);
          this.message.error('Update payment thất bại');
        }
      })
    }
  }

  loadAllTenant() {
    this.tenantService.getAllTenants().subscribe({
      next: (response) => {
        const tenants = response.content || [];
        this.availableTenant.set(tenants);
      },
      error: (err) => {
        console.error('Load tenants failed:', err);
        this.message.error('Không tải được danh sách tenant');
      }
    });
  }

  loadAllInvoice() {
    this.invoiceService.getAllInvoices().subscribe({
      next: (response) => {
        const invoices = response.content || [];
        this.availableInvoice.set(invoices);
      },
      error: (err) => {
        console.error('Load invoices failed:', err);
        this.message.error('Không tải được danh sách invoice');
      }
    });
  }


  getTenant(id: number) {
    return this.tenantService.getTenant(id).subscribe({
      next: (response) => {
        this.initTenant.set(response);
      }
    });
  }

  getInvoice(id: number) {
    return this.invoiceService.getInvoice(id).subscribe({
      next: (response) => {
        this.initInvoice.set(response);
      }
    });
  }

  parseDate(dateStr: string): Date | null {
    if (!dateStr) {
      return null;
    }

    const [datePart, timePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('-').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);

    return new Date(year, month - 1, day, hour, minute, second);
  }

  formatDateString(value: unknown, format: string): string {
    if (!value) return '';

    const date = value instanceof Date ? value : new Date(value as string);

    if (isNaN(date.getTime())) return '';

    return formatDate(date, format, 'en-US');
  }

  private patchMetadata(metadata: any) {
    const metadataArray = this.paymentForm.get('metadata') as FormArray;

    // clear cũ
    metadataArray.clear();

    if (!metadata) return;

    Object.keys(metadata).forEach(key => {
      metadataArray.push(
        this.fb.group({
          key: [key],
          value: [metadata[key]]
        })
      );
    });
  }
}
