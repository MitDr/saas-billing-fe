import {Component, inject, OnInit, signal} from '@angular/core';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {InvoiceReuseForm} from '../../../../../shell/components/form/admin/invoice-reuse-form/invoice-reuse-form';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {INVOICE_ROUTE_CONSTANT} from '../../../../../core/constant/invoice/invoice-list-constant';
import {Router} from '@angular/router';
import {TenantService} from '../../../../../core/service/tenant-service';
import {PayoutService} from '../../../../../core/service/payout-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {PaymentReuseForm} from '../../../../../shell/components/form/admin/payment-reuse-form/payment-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {PayoutReuseForm} from '../../../../../shell/components/form/admin/payout-reuse-form/payout-reuse-form';
import {PayoutRequest} from '../../../../../core/interface/request/payout-request';

@Component({
  selector: 'app-payout-create',
  imports: [
    Breadcrumb,
    InvoiceReuseForm,
    PaymentReuseForm,
    NzModalModule,
    PayoutReuseForm
  ],
  templateUrl: './payout-create.html',
  styleUrl: './payout-create.css',
})
export class PayoutCreate implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  route = INVOICE_ROUTE_CONSTANT;
  router = inject(Router);
  isSubmitting = false;
  tenantService = inject(TenantService);
  payoutService = inject(PayoutService)
  message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder)

  payoutForm = this.fb.group({
    amount: [null, [Validators.required]],
    currency: ['', [Validators.required, Validators.pattern('USD')]],
    status: ['', [Validators.required, Validators.pattern('SUCCESS|REQUESTED|PROCESSING|FAILED')]],
    stripeTransferId: [''],
    stripePayoutId: [''],
    stripeBalanceTransactionId: [''],
    tenantId: [null, [Validators.required]],
  })

  ngOnInit(): void {
    this.loadAllTenant();
  }

  loadAllTenant() {
    this.tenantService.getAllTenants().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const tenants = response.content || []; // ListData<User> có content[]
        this.availableTenant.set(tenants);
      },
      error: (err) => {
        console.error('Load tenants failed:', err);
        this.message.error('Không tải được danh sách tenant');
      }
    });
  }

  onSubmitted() {
    console.log(this.payoutForm.value);
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

      this.payoutService.createPayout(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Tạo payout thành công');
          this.payoutForm.reset();
          this.router.navigate(['/admin/tables/payouts']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Create payout failed:', err);
          this.message.error('Tạo payout thất bại');
        }
      })
    }
  }
}
