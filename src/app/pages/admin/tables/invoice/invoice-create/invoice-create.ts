import {Component, inject, OnInit, signal} from '@angular/core';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {
  EntitlementReuseForm
} from '../../../../../shell/components/form/admin/entitlement-reuse-form/entitlement-reuse-form';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Subscription} from '../../../../../core/interface/entity/subscription';
import {INVOICE_ROUTE_CONSTANT} from '../../../../../core/constant/invoice/invoice-list-constant';
import {Router} from '@angular/router';
import {TenantService} from '../../../../../core/service/tenant-service';
import {SubscriptionService} from '../../../../../core/service/subscription-service';
import {InvoiceService} from '../../../../../core/service/invoice-service';
import {SubscriberService} from '../../../../../core/service/subscriber-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {Subscriber} from '../../../../../core/interface/entity/subscriber';
import {formatDate} from '@angular/common';
import {InvoiceReuseForm} from '../../../../../shell/components/form/admin/invoice-reuse-form/invoice-reuse-form';
import {InvoiceRequest} from '../../../../../core/interface/request/invoice-request';

@Component({
  selector: 'app-invoice-create',
  imports: [
    Breadcrumb,
    EntitlementReuseForm,
    NzModalModule,
    InvoiceReuseForm,
  ],
  templateUrl: './invoice-create.html',
  styleUrl: './invoice-create.css',
})
export class InvoiceCreate implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  availableSubscription = signal<Subscription[]>([]);
  availableSubscriber = signal<Subscriber[]>([]);
  route = INVOICE_ROUTE_CONSTANT;
  router = inject(Router);
  isSubmitting = false;
  invoiceService = inject(InvoiceService);
  tenantService = inject(TenantService);
  subscriptionService = inject(SubscriptionService);
  subscriberService = inject(SubscriberService);
  message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder)
  invoiceForm = this.fb.group({
    amount: [null, [Validators.required, Validators.min(1)]],
    currency: ['', [Validators.required, Validators.pattern('USD|VND')]],
    status: ['', [Validators.required, Validators.pattern('PAID|DRAFT|UNPAID|VOID')]],
    paidDate: [''],
    billingPeriodStart: ['', [Validators.required]],
    billingPeriodEnd: ['', [Validators.required]],
    amountUsd: [null, [Validators.required]],
    exchangeRate: [null, [Validators.required]],
    subscriberId: [null, [Validators.required]],
    tenantId: [null, [Validators.required]],
    subscriptionId: [null, [Validators.required]],
    metadata: this.fb.array([])
  })

  ngOnInit(): void {
    this.loadAllTenant();
    this.loadAllSubscriber();
    this.loadAllSubscription()
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

  loadAllSubscription() {
    // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
    this.subscriptionService.getAllSubscriptions().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const subscriptions = response.content || []; // ListData<User> có content[]
        this.availableSubscription.set(subscriptions);
        // console.log('Loaded tenant for modal:', users.length, users);
      },
      error: (err) => {
        console.error('Load subscription failed:', err);
        this.message.error('Không tải được danh sách subscription');
      }
    });
  }

  loadAllSubscriber() {
    // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
    this.subscriberService.getAllSubscribers().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const subscribers = response.content || []; // ListData<User> có content[]
        this.availableSubscriber.set(subscribers);
        // console.log('Loaded tenant for modal:', users.length, users);
      },
      error: (err) => {
        console.error('Load subscriber failed:', err);
        this.message.error('Không tải được danh sách subscriber');
      }
    });
  }

  onSubmitted() {
    console.log(this.invoiceForm.value)
    if (this.invoiceForm.valid) {
      this.isSubmitting = true;

      const raw = this.invoiceForm.value;

      // Convert metadata array -> object
      const metadataObject: any = {};

      if (raw.metadata && raw.metadata.length > 0) {
        raw.metadata.forEach((item: any) => {
          if (item.key) {
            metadataObject[item.key] = item.value;
          }
        });
      }

      const payload: InvoiceRequest = {
        amount: this.invoiceForm.value.amount!,
        currency: this.invoiceForm.value.currency! as 'USD' | 'VND',
        status: this.invoiceForm.value.status! as 'PAID' | 'DRAFT' | 'UNPAID' | 'VOID',
        billingPeriodStart: this.formatDateString(this.invoiceForm.value.billingPeriodStart!, 'dd-MM-yyyy HH:mm:ss'),
        billingPeriodEnd: this.formatDateString(this.invoiceForm.value.billingPeriodEnd!, 'dd-MM-yyyy HH:mm:ss'),
        amountUsd: this.invoiceForm.value.amountUsd!,
        exchangeRate: this.invoiceForm.value.exchangeRate!,
        subscriberId: this.invoiceForm.value.subscriberId!,
        tenantId: this.invoiceForm.value.tenantId!,
        subscriptionId: this.invoiceForm.value.subscriptionId!,
        metadata: metadataObject,
      };

      if (Object.keys(metadataObject).length === 0) {
        delete payload.metadata;
      }

      if (this.invoiceForm.value.paidDate !== '') {
        if (this.invoiceForm.value.paidDate) {
          const paidDate = this.formatDateString(this.invoiceForm.value.paidDate, 'dd-MM-yyyy HH:mm:ss')
          Object.assign(payload, {paidDate});
        }
      }

      console.log(payload)
      this.invoiceService.createInvoice(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Tạo invoice thành công');
          this.invoiceForm.reset();
          this.router.navigate(['/admin/tables/invoices']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Create invoice failed:', err);
          this.message.error('Tạo invoice thất bại');
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
