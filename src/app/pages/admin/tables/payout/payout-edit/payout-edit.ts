import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {INVOICE_ROUTE_CONSTANT} from '../../../../../core/constant/invoice/invoice-list-constant';
import {TenantService} from '../../../../../core/service/tenant-service';
import {PayoutService} from '../../../../../core/service/payout-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Payout} from '../../../../../core/interface/entity/payout';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {InvoiceReuseForm} from '../../../../../shell/components/form/admin/invoice-reuse-form/invoice-reuse-form';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {PayoutReuseForm} from '../../../../../shell/components/form/admin/payout-reuse-form/payout-reuse-form';
import {PayoutRequest} from '../../../../../core/interface/request/payout-request';

@Component({
  selector: 'app-payout-edit',
  imports: [
    NzModalModule,
    Breadcrumb,
    InvoiceReuseForm,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    PayoutReuseForm,
  ],
  templateUrl: './payout-edit.html',
  styleUrl: './payout-edit.css',
})
export class PayoutEdit implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  routing = INVOICE_ROUTE_CONSTANT;
  tenantService = inject(TenantService);
  payoutService = inject(PayoutService);
  message = inject(NzMessageService);

  initTenant = signal<Tenant | null>(null);


  payout = signal<Payout | null>(null);
  loading = signal(false);
  isSubmitting = false;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  payoutForm = this.fb.group({
    amount: [null as number | null, [Validators.required]],
    currency: ['', [Validators.required, Validators.pattern('USD')]],
    status: ['', [Validators.required, Validators.pattern('SUCCESS|REQUESTED|PROCESSING|FAILED')]],
    stripeTransferId: [''],
    stripePayoutId: [''],
    stripeBalanceTransactionId: [''],
    tenantId: [null as number | null, [Validators.required]],
  })

  constructor() {
    // Load user khi có id từ route
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadPayout(+id);
      }
    });
    effect(() => {
      const currentInvoice = this.payout();
      if (currentInvoice) {
        this.payoutForm.patchValue({
          amount: currentInvoice.amount,
          currency: currentInvoice.currency,
          status: currentInvoice.status,
          stripeTransferId: currentInvoice.stripeTransferId,
          stripePayoutId: currentInvoice.stripePayoutId,
          stripeBalanceTransactionId: currentInvoice.stripeBalanceTransactionId,
          tenantId: currentInvoice.tenant.id,
          // metadata: currentInvoice.metadata
        });
        this.getTenant(currentInvoice?.tenant.id!);
      }
    });
  }

  ngOnInit(): void {
    this.loadAllTenant();
  }


  getTenant(id: number) {
    return this.tenantService.getTenant(id).subscribe({
      next: (response) => {
        this.initTenant.set(response);
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

  loadPayout(id: number) {
    this.loading.set(true);
    this.payoutService.getPayout(id).subscribe({
      next: (response) => {
        this.payout.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  onSubmitted() {
    if (this.payoutForm.valid) {
      this.isSubmitting = true;

      const payload: PayoutRequest = {
        amount: this.payoutForm.value.amount!,
        currency: this.payoutForm.value.currency as 'USD',
        status: this.payoutForm.value.status as 'SUCCESS' | 'REQUESTED' | 'PROCESSING' | 'FAILED',
        tenantId: this.payoutForm.value.tenantId!
      }

      if (this.payoutForm.value.stripePayoutId) {
        const stripePayoutId = this.payoutForm.value.stripePayoutId as string;
        Object.assign(payload, {stripePayoutId})
      }
      if (this.payoutForm.value.stripePayoutId) {
        const stripePayoutId = this.payoutForm.value.stripePayoutId as string;
        Object.assign(payload, {stripePayoutId})
      }
      if (this.payoutForm.value.stripeBalanceTransactionId) {
        const stripeBalanceTransactionId = this.payoutForm.value.stripeBalanceTransactionId as string;
        Object.assign(payload, {stripeBalanceTransactionId})
      }

      this.payoutService.update(payload, this.payout()?.id!).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Update payout thành công');
          this.payoutForm.reset();
          this.router.navigate(['/admin/tables/payouts']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Update payout failed:', err);
          this.message.error('Update payout thất bại');
        }
      })
    }
  }
}
