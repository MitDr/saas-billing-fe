import {Component, inject, OnInit, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Invoice} from '../../../../../core/interface/entity/invoice';
import {Subscriber} from '../../../../../core/interface/entity/subscriber';
import {Price} from '../../../../../core/interface/entity/price';
import {PAYMENT_ROUTE_CONSTANT} from '../../../../../core/constant/payment/payment-list-constant';
import {Router} from '@angular/router';
import {SUBSCRIPTION_ROUTE_CONSTANT} from '../../../../../core/constant/subscription/subscription-list-constant';
import {InvoiceService} from '../../../../../core/service/invoice-service';
import {TenantService} from '../../../../../core/service/tenant-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {SubscriberService} from '../../../../../core/service/subscriber-service';
import {PriceService} from '../../../../../core/service/price-service';
import {formatDate} from '@angular/common';
import {PaymentRequest} from '../../../../../core/interface/request/payment-request';
import {SubscriptionRequest} from '../../../../../core/interface/request/subscription-request';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {PaymentReuseForm} from '../../../../../shell/components/form/admin/payment-reuse-form/payment-reuse-form';
import {
  SubscriberReuseForm
} from '../../../../../shell/components/form/admin/subscriber-reuse-form/subscriber-reuse-form';
import {
  SubscriptionReuseForm
} from '../../../../../shell/components/form/admin/subscription-reuse-form/subscription-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-subscription-create',
  imports: [
    Breadcrumb,
    SubscriptionReuseForm,
    NzModalModule
  ],
  templateUrl: './subscription-create.html',
  styleUrl: './subscription-create.css',
})
export class SubscriptionCreate implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  availableInvoice = signal<Invoice[]>([]);
  availablePrice = signal<Price[]>([]);
  availableSubscriber = signal<Subscriber[]>([]);
  route = SUBSCRIPTION_ROUTE_CONSTANT;
  router = inject(Router);
  isSubmitting = false;
  invoiceService = inject(InvoiceService);
  tenantService = inject(TenantService);
  priceService = inject(PriceService);
  subscriberService = inject(SubscriberService);
  message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder)

  subscriptionForm = this.fb.group({
    status: ['', [Validators.required, Validators.pattern('ACTIVE|DRAFT|PENDING|ENDED|CANCEL')]],
    defaultPaymentMethod: [''],
    quantity: [null],
    isTrial: [null],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    cancelAtPeriodEnd: [null, Validators.required],
    cancelDate: [''],
    dueDate: ['', Validators.required],
    subscriberId: [null, Validators.required],
    priceId: [null, Validators.required],
    invoices: [[]],
    tenantId: [null, Validators.required],
    metadata: this.fb.array([])
  })

  ngOnInit(): void {
    this.loadAllTenant();
    this.loadAllInvoice();
    this.loadAllSubscriber();
    this.loadAllPrice();
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
  loadAllSubscriber() {
    this.subscriberService.getAllSubscribers().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const subscriber = response.content || []; // ListData<User> có content[]
        this.availableSubscriber.set(subscriber);
      },
      error: (err) => {
        console.error('Load subscriber failed:', err);
        this.message.error('Không tải được danh sách subscriber');
      }
    });
  }
  loadAllPrice() {
    this.priceService.getAllPrices().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const price = response.content || []; // ListData<User> có content[]
        this.availablePrice.set(price);
      },
      error: (err) => {
        console.error('Load price failed:', err);
        this.message.error('Không tải được danh sách price');
      }
    });
  }

  onSubmitted() {
    console.log(this.subscriptionForm.value)
    if (this.subscriptionForm.valid) {
      this.isSubmitting = true;

      const raw = this.subscriptionForm.value;

      // Convert metadata array -> object
      const metadataObject: any = {};

      if (raw.metadata && raw.metadata.length > 0) {
        raw.metadata.forEach((item: any) => {
          if (item.key) {
            metadataObject[item.key] = item.value;
          }
        });
      }

      const payload: SubscriptionRequest = {
        status: this.subscriptionForm.value.status! as "ACTIVE" | 'DRAFT' | 'PENDING' | 'ENDED' | 'CANCEL',
        quantity: this.subscriptionForm.value.quantity!,
        isTrial: this.subscriptionForm.value.isTrial!,
        startDate: this.subscriptionForm.value.startDate!,
        endDate: this.subscriptionForm.value.endDate!,
        dueDate: this.subscriptionForm.value.dueDate!,
        subscriberId: this.subscriptionForm.value.subscriberId!,
        priceId: this.subscriptionForm.value.priceId!,
        tenantId: this.subscriptionForm.value.tenantId!,
        cancelAtPeriodEnd: this.subscriptionForm.value.cancelAtPeriodEnd!
      };

      if (this.subscriptionForm.value.defaultPaymentMethod) {
        const defaultPaymentMethod = this.subscriptionForm.value.defaultPaymentMethod as string;
        Object.assign(payload, {defaultPaymentMethod})
      }

      if (this.subscriptionForm.value.cancelDate !== '') {
        if (this.subscriptionForm.value.cancelDate) {
          const cancelDate = this.formatDateString(this.subscriptionForm.value.cancelDate, 'dd-MM-yyyy HH:mm:ss')
          Object.assign(payload, {cancelDate});
        }
      }

      const invoices = this.subscriptionForm.value.invoices! as number[];
      if (invoices.length > 0){
        Object.assign(payload, {invoices})
      }

      if (Object.keys(metadataObject).length === 0) {
        delete payload.metadata;
      }

      console.log(payload)
      // this.paymentService.createPayment(payload).subscribe({
      //   next: (response) => {
      //     this.isSubmitting = false;
      //     this.message.success('Tạo payment thành công');
      //     this.paymentForm.reset();
      //     this.router.navigate(['/admin/tables/payments']);
      //   },
      //   error: (err) => {
      //     this.isSubmitting = false;
      //     console.error('Create payment failed:', err);
      //     this.message.error('Tạo payment thất bại');
      //   }
      // })
    }
  }

  formatDateString(value: unknown, format: string): string {
    if (!value) return '';

    const date = value instanceof Date ? value : new Date(value as string);

    if (isNaN(date.getTime())) return '';

    return formatDate(date, format, 'en-US');
  }
}
