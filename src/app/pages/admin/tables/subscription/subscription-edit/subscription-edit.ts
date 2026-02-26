import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Invoice} from '../../../../../core/interface/entity/invoice';
import {Price} from '../../../../../core/interface/entity/price';
import {Subscriber} from '../../../../../core/interface/entity/subscriber';
import {TenantService} from '../../../../../core/service/tenant-service';
import {InvoiceService} from '../../../../../core/service/invoice-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SUBSCRIPTION_ROUTE_CONSTANT} from '../../../../../core/constant/subscription/subscription-list-constant';
import {PriceService} from '../../../../../core/service/price-service';
import {SubscriberService} from '../../../../../core/service/subscriber-service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormArray, NonNullableFormBuilder, Validators} from '@angular/forms';
import {Subscription} from '../../../../../core/interface/entity/subscription';
import {formatDate} from '@angular/common';
import {SubscriptionService} from '../../../../../core/service/subscription-service';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {
  SubscriptionReuseForm
} from '../../../../../shell/components/form/admin/subscription-reuse-form/subscription-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-subscription-edit',
  imports: [
    Breadcrumb,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    SubscriptionReuseForm,
    NzModalModule
  ],
  templateUrl: './subscription-edit.html',
  styleUrl: './subscription-edit.css',
})
export class SubscriptionEdit  implements  OnInit{
  availableTenant = signal<Tenant[]>([]);
  availableInvoice = signal<Invoice[]>([]);
  availablePrice = signal<Price[]>([]);
  availableSubscriber = signal<Subscriber[]>([]);

  routing = SUBSCRIPTION_ROUTE_CONSTANT;
  tenantService = inject(TenantService);
  invoiceService = inject(InvoiceService)
  priceService = inject(PriceService);
  subscriberService = inject(SubscriberService);
  subscriptionService = inject(SubscriptionService);
  message = inject(NzMessageService);

  initInvoice = signal<Invoice[]>([]);
  initTenant = signal<Tenant | null>(null);
  initPrice = signal<Price | null>(null);
  initSubscriber = signal<Subscriber | null>(null);

  subscription = signal<Subscription | null>(null);
  loading = signal(false);
  isSubmitting = false;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);

  subscriptionForm = this.fb.group({
    status: ['', [Validators.required, Validators.pattern('ACTIVE|DRAFT|PENDING|ENDED|CANCEL')]],
    defaultPaymentMethod: [''],
    quantity: [null as number | null],
    isTrial: [null as boolean | null],
    startDate: [null as Date | null, Validators.required],
    endDate: [null as Date | null, Validators.required],
    cancelAtPeriodEnd: [null as boolean | null, Validators.required],
    cancelDate: [null as Date | null],
    dueDate: [null as Date | null, Validators.required],
    subscriberId: [null as number | null, Validators.required],
    priceId: [null as number | null, Validators.required],
    invoices: [[]],
    tenantId: [null as number | null, Validators.required],
    metadata: this.fb.array([])
  })

  constructor() {
    // Load user khi có id từ route
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadSubscription(+id);
      }
    });
    effect(() => {
      const currentSubscription = this.subscription();
      if (currentSubscription) {
        console.log(currentSubscription)
        this.subscriptionForm.patchValue({
          status: currentSubscription.status,
          quantity: currentSubscription.quantity,
          isTrial: currentSubscription.trial,
          startDate: this.parseDate(currentSubscription.startDate),
          endDate: this.parseDate(currentSubscription.endDate),
          cancelAtPeriodEnd: currentSubscription.cancelAtPeriodEnd,
          defaultPaymentMethod: currentSubscription.defaultPaymentMethod!,
          cancelDate: this.parseDate(currentSubscription.cancelDate) || null,
          dueDate: this.parseDate(currentSubscription.dueDate),
          // metadata: currentInvoice.metadata
        });
        this.patchMetadata(currentSubscription.metadata);
        this.getTenant(currentSubscription?.tenant.id);
        this.getPrice(currentSubscription?.price.id)
        this.getInvoice(currentSubscription?.invoices.map(u=>u.id))
      }
    });
  }

  ngOnInit(): void {
    this.loadAllTenant();
    this.loadAllInvoice();
    this.loadAllPrice();
    this.loadAllSubscriber();
  }

  loadSubscription(id: number) {
    this.loading.set(true);
    this.subscriptionService.getSubscription(id).subscribe({
      next: (response) => {
        this.subscription.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
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
  loadAllPrice() {
    this.priceService.getAllPrices().subscribe({
      next: (response) => {
        const prices = response.content || [];
        this.availablePrice.set(prices);
      },
      error: (err) => {
        console.error('Load prices failed:', err);
        this.message.error('Không tải được danh sách prices');
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
  loadAllSubscriber() {
    this.subscriberService.getAllSubscribers().subscribe({
      next: (response) => {
        const subscriber = response.content || [];
        this.availableSubscriber.set(subscriber);
      },
      error: (err) => {
        console.error('Load subscers failed:', err);
        this.message.error('Không tải được danh sách subscriber');
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

  getTenant(id: number) {
    return this.tenantService.getTenant(id).subscribe({
      next: (response) => {
        this.initTenant.set(response);
      }
    });
  }
  getPrice(id: number) {
    return this.priceService.getPrice(id).subscribe({
      next: (response) => {
        this.initPrice.set(response);
      }
    });
  }

  getInvoice(ids: number[]): void {
    this.invoiceService.getAllInvoices().subscribe({
      next: (invoices) => {
        const idSet = new Set(ids);
        const filterInvoice = invoices.content.filter(inv => idSet.has(inv.id));
        this.initInvoice.set(filterInvoice);
      }
    });
  }

  private patchMetadata(metadata: any) {
    const metadataArray = this.subscriptionForm.get('metadata') as FormArray;

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

  onSubmitted() {
    console.log(this.subscriptionForm.value)
  }
}
