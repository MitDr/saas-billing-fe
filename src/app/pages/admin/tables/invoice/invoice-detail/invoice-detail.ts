import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Invoice} from '../../../../../core/interface/entity/invoice';
import {InvoiceService} from '../../../../../core/service/invoice-service';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {InvoiceCard} from '../../../../../shell/components/card/invoice/invoice-card/invoice-card';

@Component({
  selector: 'app-invoice-detail',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    InvoiceCard
  ],
  templateUrl: './invoice-detail.html',
  styleUrl: './invoice-detail.css',
})
export class InvoiceDetail {
  loading = signal(false);
  invoice = signal<Invoice | null>(null);
  invoiceService = inject(InvoiceService);
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
        this.router.navigate(['/admin/tables/invoices'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
