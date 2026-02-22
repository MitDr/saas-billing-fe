import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {PaymentService} from '../../../../../core/service/payment-service';
import {Payment} from '../../../../../core/interface/entity/payment';
import {EntitlementCard} from '../../../../../shell/components/card/entitlement/entitlement-card/entitlement-card';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {PaymentCard} from '../../../../../shell/components/card/payment/payment-card/payment-card';

@Component({
  selector: 'app-payment-detail',
  imports: [
    EntitlementCard,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    PaymentCard
  ],
  templateUrl: './payment-detail.html',
  styleUrl: './payment-detail.css',
})
export class PaymentDetail {
  loading = signal(false);
  payment = signal<Payment | null>(null);
  paymentService = inject(PaymentService);
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
        this.router.navigate(['/admin/tables/payments'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
