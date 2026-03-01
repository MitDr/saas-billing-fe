import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthPayment} from '../../../../../core/interface/entity/auth/auth-payment';
import {AuthPaymentService} from '../../../../../core/service/auth/auth-payment-service';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {PaymentCard} from '../../../../../shell/components/card/payment/payment-card/payment-card';
import {AuthPaymentCard} from '../../../../../shell/components/card/auth/auth-payment-card/auth-payment-card';
import {NzModalModule} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-auth-payment-detail',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    PaymentCard,
    RouterLink,
    AuthPaymentCard,
    NzModalModule,
  ],
  templateUrl: './auth-payment-detail.html',
  styleUrl: './auth-payment-detail.css',
})
export class AuthPaymentDetail {
  loading = signal(false);
  payment = signal<AuthPayment | null>(null);
  paymentService = inject(AuthPaymentService);
  router = inject(Router);
  message = inject(NzMessageService)
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadPayment(+id)
      }
    });
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

  onDelete(id: number) {
    // console.log(id);
    this.loading.set(true);
    this.paymentService.deletePayment(id).subscribe({
      next: (response) => {
        this.message.success('payment deleted successfully');
        this.router.navigate(['/app/tables/payments'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
