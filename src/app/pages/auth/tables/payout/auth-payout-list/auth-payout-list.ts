import {Component, inject, Signal, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {Payout} from '../../../../../core/interface/entity/payout';
import {AuthPayout} from '../../../../../core/interface/entity/auth/auth-payout';
import {
  AUTH_PAYOUT_ROUTE_CONSTANT,
  PAYOUT_ROUTE_CONSTANT
} from '../../../../../core/constant/payout/payout-list-constant';
import {PayoutService} from '../../../../../core/service/payout-service';
import {AuthPayoutService} from '../../../../../core/service/auth/auth-payout-service';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {CURRENCYOPTIONS} from '../../../../admin/tables/price/price-list/price-list';
import {PAYOUTSTATUSOPTION} from '../../../../admin/tables/payout/payout-list/payout-list';
import {AuthGenericListComponent} from '../../../../../core/generic/base-auth-list-component';
import {PayoutRequest} from '../../../../../core/interface/request/payout-request';
import {AuthPayoutRequest} from '../../../../../core/interface/request/auth/auth-payout-request';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {FormsModule, NonNullableFormBuilder, Validators} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {RouterLink} from '@angular/router';
import {
  AuthWebhookEndpointReuseForm
} from '../../../../../shell/components/form/auth/auth-webhook-endpoint-reuse-form/auth-webhook-endpoint-reuse-form';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';
import {
  AuthPayoutReuseForm
} from '../../../../../shell/components/form/auth/auth-payout-reuse-form/auth-payout-reuse-form';

@Component({
  selector: 'app-auth-payout-list',
  imports: [
    EditableDataTable,
    FormsModule,
    NzButtonComponent,
    NzInputDirective,
    NzInputWrapperComponent,
    NzOptionComponent,
    NzSelectComponent,
    RouterLink,
    AuthWebhookEndpointReuseForm,
    NzModalComponent,
    NzModalContentDirective,
    AuthPayoutReuseForm
  ],
  templateUrl: './auth-payout-list.html',
  styleUrl: './auth-payout-list.css',
})
export class AuthPayoutList extends AuthGenericListComponent<AuthPayout, AuthPayoutRequest> {
  payoutPage = signal<ListData<AuthPayout> | null>(null);
  checked = false;
  createRoute = '/app/tables/payouts/create'
  payoutListRouting = AUTH_PAYOUT_ROUTE_CONSTANT;
  private payoutService = inject(AuthPayoutService)
  isCreateModalOpen = signal(false);
  isSubmitting = false;
  private fb = inject(NonNullableFormBuilder)
  payoutForm = this.fb.group({
    amount: [null, [Validators.required]],
    currency: ['', [Validators.required, Validators.pattern('USD')]],
  })

  getDataPage(): Signal<ListData<AuthPayout> | null> {
    return this.payoutPage;
  }

  override getColumns(): ColumnConfig<AuthPayout>[] {
    return [
      {key: 'id', title: 'Id', editable: false},
      {key: 'amount', title: 'Amount', editable: true, type: "text"},
      {key: 'currency', title: 'Currency', type: 'select', editable: true, options: CURRENCYOPTIONS},
      // {key: 'stripeTransferId', title: 'TransferId', editable: true, type: "text"},
      {key: 'status', title: 'Status', editable: true, type: "select", options: PAYOUTSTATUSOPTION},
      // {key: 'stripeBalanceTransactionId', title: 'B.Transaction Id', editable: true, type: "text"},
    ];
  }

  getCreateRoute(): string {
    return this.createRoute;
  }

  getRoutingConstant(): any {
    return this.payoutListRouting;
  }

  getService() {
    return this.payoutService;
  }

  onSearchChange(value: string) {
    if (value !== this.search()) {
      this.searchSubject.next(value);
    }
  }

  protected loadData(
    page: number,
    size: number,
    search?: string,
    sort?: string
  ): void {
    this.loading.set(true);
    this.payoutService.getPayouts(page, size, search).subscribe({
      next: (response) => {
        this.payoutPage.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Không thể tải danh sách payouts');
        this.loading.set(false);
      }
    });
  }

  protected mapToUpdatePayload(updatePayout: AuthPayout): AuthPayoutRequest {
    const result: AuthPayoutRequest = {
      amount: updatePayout.amount,
      currency: updatePayout.currency,
    }
    return result;
  }

  openCreateModal() {
    this.isCreateModalOpen.set(true);
  }

  onConfirmModal(){
    this.isCreateModalOpen.set(false);
    this.reloadData()
  }

  onCloseModal(){
    this.isCreateModalOpen.set(false);
  }

  onSubmitted() {
    console.log(this.payoutForm.value);
    if (this.payoutForm.valid) {
      this.isSubmitting = true;

      const payload: AuthPayoutRequest = {
        amount: this.payoutForm.value.amount!,
        currency: this.payoutForm.value.currency as 'USD',
      }

      this.payoutService.createPayout(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Tạo payout thành công');
          this.payoutForm.reset();
          // this.router.navigate(['/admin/tables/payouts']);
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
