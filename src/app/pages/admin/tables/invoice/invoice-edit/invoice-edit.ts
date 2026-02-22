import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Subscriber} from '../../../../../core/interface/entity/subscriber';
import {Subscription} from '../../../../../core/interface/entity/subscription';
import {TenantService} from '../../../../../core/service/tenant-service';
import {SubscriptionService} from '../../../../../core/service/subscription-service';
import {SubscriberService} from '../../../../../core/service/subscriber-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Invoice} from '../../../../../core/interface/entity/invoice';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormArray, NonNullableFormBuilder, Validators} from '@angular/forms';
import {InvoiceService} from '../../../../../core/service/invoice-service';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {
  EntitlementReuseForm
} from '../../../../../shell/components/form/admin/entitlement-reuse-form/entitlement-reuse-form';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {INVOICE_ROUTE_CONSTANT} from '../../../../../core/constant/invoice/invoice-list-constant';
import {InvoiceReuseForm} from '../../../../../shell/components/form/admin/invoice-reuse-form/invoice-reuse-form';
import {InvoiceRequest} from '../../../../../core/interface/request/invoice-request';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-invoice-edit',
  imports: [NzModalModule, Breadcrumb, EntitlementReuseForm, NzBreadCrumbComponent, NzBreadCrumbItemComponent, NzPageHeaderComponent, NzSpinComponent, RouterLink, InvoiceReuseForm],
  templateUrl: './invoice-edit.html',
  styleUrl: './invoice-edit.css',
})
export class InvoiceEdit implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  availableSubscription = signal<Subscription[]>([]);
  availableSubscriber = signal<Subscriber[]>([]);
  routing = INVOICE_ROUTE_CONSTANT;
  tenantService = inject(TenantService);
  subscriptionService = inject(SubscriptionService);
  subscriberService = inject(SubscriberService);
  invoiceService = inject(InvoiceService)
  message = inject(NzMessageService);

  initSubscription = signal<Subscription | null>(null);
  initTenant = signal<Tenant | null>(null);
  initSubscriber = signal<Subscriber | null>(null);

  invoice = signal<Invoice | null>(null);
  loading = signal(false);
  isSubmitting = false;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  invoiceForm = this.fb.group({
    amount: [null as number | null, [Validators.required, Validators.min(1)]],
    currency: ['', [Validators.required, Validators.pattern('USD|VND')]],
    status: ['', [Validators.required, Validators.pattern('PAID|DRAFT|UNPAID|VOID')]],
    paidDate: [''],
    billingPeriodStart: [null as Date | null, [Validators.required]],
    billingPeriodEnd: [null as Date | null, [Validators.required]],
    amountUsd: [null as number | null, [Validators.required]],
    exchangeRate: [null as number | null, [Validators.required]],
    subscriberId: [null as number | null, [Validators.required]],
    tenantId: [null as number | null, [Validators.required]],
    subscriptionId: [null as number | null, [Validators.required]],
    metadata: this.fb.array([])
  })

  constructor() {
    // Load user khi có id từ route
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadInvoice(+id);
      }
    });
    effect(() => {
      const currentInvoice = this.invoice();
      if (currentInvoice) {
        this.invoiceForm.patchValue({
          amount: currentInvoice.amount,
          currency: currentInvoice.currency,
          status: currentInvoice.status,
          paidDate: currentInvoice.paidDate,
          billingPeriodStart: this.parseDate(currentInvoice.billingPeriodStart),
          billingPeriodEnd: this.parseDate(currentInvoice.billingPeriodStart),
          amountUsd: currentInvoice.amountUsd,
          exchangeRate: parseFloat(currentInvoice.exchangeRate),
          subscriberId: currentInvoice.subscriber.id,
          tenantId: currentInvoice.tenant.id,
          subscriptionId: currentInvoice.subscription.id,
          // metadata: currentInvoice.metadata
        });
        this.patchMetadata(currentInvoice.metadata);
        this.getSubscription(currentInvoice?.subscription.id);
        this.getSubscriber(currentInvoice?.subscriber.id!);
        this.getTenant(currentInvoice?.tenant.id!);
      }
    });
  }

  loadInvoice(id: number) {
    this.loading.set(true);
    this.invoiceService.getInvoice(id).subscribe({
      next: (response) => {
        this.invoice.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  ngOnInit(): void {
    this.loadAllTenant();
    this.loadAllSubscriber();
    this.loadAllSubscription()

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

  loadAllSubscription() {
    this.subscriptionService.getAllSubscriptions().subscribe({
      next: (response) => {
        const subscriptions = response.content || [];
        this.availableSubscription.set(subscriptions);
      },
      error: (err) => {
        console.error('Load subscription failed:', err);
        this.message.error('Không tải được danh sách subscription');
      }
    });
  }

  loadAllSubscriber() {
    this.subscriberService.getAllSubscribers().subscribe({
      next: (response) => {
        const subscribers = response.content || [];
        this.availableSubscriber.set(subscribers);
      },
      error: (err) => {
        console.error('Load subscribers failed:', err);
        this.message.error('Không tải được danh sách subscribers');
      }
    });
  }

  getSubscription(id: number) {
    return this.subscriptionService.getSubscription(id).subscribe({
      next: (response) => {
        this.initSubscription.set(response);
      }
    });
  }

  getSubscriber(id: number) {
    return this.subscriberService.getSubscriber(id).subscribe({
      next: (response) => {
        this.initSubscriber.set(response);
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

  onSubmitted() {
    console.log(this.invoiceForm.value)
    if (this.invoiceForm.valid) {
      this.isSubmitting = true;

      const raw = this.invoiceForm.value;

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
      this.invoiceService.update(payload, this.invoice()?.id!).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Update invoice thành công');
          this.invoiceForm.reset();
          this.router.navigate(['/admin/tables/invoices']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Update invoice failed:', err);
          this.message.error('Update invoice thất bại');
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

  parseDate(dateStr: string): Date | null {
    if (!dateStr) {
      return null;
    }

    const [datePart, timePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('-').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);

    return new Date(year, month - 1, day, hour, minute, second);
  }

  private patchMetadata(metadata: any) {
    const metadataArray = this.invoiceForm.get('metadata') as FormArray;

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
