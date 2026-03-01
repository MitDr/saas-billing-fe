import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthInvoice} from '../../../../../core/interface/entity/auth/auth-invoice';
import {AuthInvoiceService} from '../../../../../core/service/auth/auth-invoice-service';
import {InvoiceCard} from '../../../../../shell/components/card/invoice/invoice-card/invoice-card';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {AuthInvoiceCard} from '../../../../../shell/components/card/auth/auth-invoice-card/auth-invoice-card';
import {NzModalComponent} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-auth-invoice-detail',
  imports: [
    InvoiceCard,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    AuthInvoiceCard,
    NzModalComponent,

  ],
  templateUrl: './auth-invoice-detail.html',
  styleUrl: './auth-invoice-detail.css',
})
export class AuthInvoiceDetail {
  loading = signal(false);
  invoice = signal<AuthInvoice | null>(null);
  invoiceService = inject(AuthInvoiceService);
  router = inject(Router);
  message = inject(NzMessageService)
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadInvoice(+id)
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

  onDelete(id: number) {
    // console.log(id);
    this.loading.set(true);
    this.invoiceService.deleteInvoice(id).subscribe({
      next: (response) => {
        this.message.success('invoice deleted successfully');
        this.router.navigate(['/app/tables/invoices'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
