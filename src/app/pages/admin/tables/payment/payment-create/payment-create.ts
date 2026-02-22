import {Component, inject, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Invoice} from '../../../../../core/interface/entity/invoice';
import {Router} from '@angular/router';
import {InvoiceService} from '../../../../../core/service/invoice-service';
import {TenantService} from '../../../../../core/service/tenant-service';
import {PaymentService} from '../../../../../core/service/payment-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {PaymentRequest} from '../../../../../core/interface/request/payment-request';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {InvoiceReuseForm} from '../../../../../shell/components/form/admin/invoice-reuse-form/invoice-reuse-form';
import {PaymentReuseForm} from '../../../../../shell/components/form/admin/payment-reuse-form/payment-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {PAYMENT_ROUTE_CONSTANT} from '../../../../../core/constant/payment/payment-list-constant';

@Component({
  selector: 'app-payment-create',
  imports: [
    Breadcrumb,
    InvoiceReuseForm,
    PaymentReuseForm,
    NzModalModule
  ],
  templateUrl: './payment-create.html',
  styleUrl: './payment-create.css',
})
export class PaymentCreate {
  availableTenant = signal<Tenant[]>([]);
  availableInvoice = signal<Invoice[]>([]);
  route = PAYMENT_ROUTE_CONSTANT;
  router = inject(Router);
  isSubmitting = false;
  invoiceService = inject(InvoiceService);
  tenantService = inject(TenantService);
  paymentService = inject(PaymentService);
  message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder)
  paymentForm = this.fb.group({
    amount: [null, Validators.required],
    currency: ['', Validators.required],
    status: ['', Validators.required],
    paymentIntentId: [''],
    chargeId: ['',],
    balanceTransactionId: [''],
    paymentMethod: [''],
    availableOn: [''],
    invoiceId: [null],
    tenantId: [null, Validators.required],
    metadata: this.fb.array([])
  })

  ngOnInit(): void {
    this.loadAllTenant();
    this.loadAllInvoice();
  }

  loadAllTenant() {
    // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
    this.tenantService.getAllTenants().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const tenants = response.content || []; // ListData<User> có content[]
        this.availableTenant.set(tenants);
        // console.log('Loaded tenant for modal:', users.length, users);
      },
      error: (err) => {
        console.error('Load tenants failed:', err);
        this.message.error('Không tải được danh sách tenant');
      }
    });
  }

  loadAllInvoice() {
    // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
    this.invoiceService.getAllInvoices().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const invoices = response.content || []; // ListData<User> có content[]
        this.availableInvoice.set(invoices);
        // console.log('Loaded tenant for modal:', users.length, users);
      },
      error: (err) => {
        console.error('Load invoices failed:', err);
        this.message.error('Không tải được danh sách invoices');
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

      if (this.paymentForm.value.availableOn !== '') {
        if (this.paymentForm.value.availableOn) {
          const availableOn = this.formatDateString(this.paymentForm.value.availableOn, 'dd-MM-yyyy HH:mm:ss')
          Object.assign(payload, {availableOn});
        }
      }

      console.log(payload)
      this.paymentService.createPayment(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Tạo payment thành công');
          this.paymentForm.reset();
          this.router.navigate(['/admin/tables/payments']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Create payment failed:', err);
          this.message.error('Tạo payment thất bại');
        }
      })
    }
  }

  formatDateString(value: unknown, format: string): string {
    if (!value) return '';

    const date = value instanceof Date ? value : new Date(value as string);

    if (isNaN(date.getTime())) return '';

    return formatDate(date, format, 'en-US');
  }

}
