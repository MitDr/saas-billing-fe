import {Component} from '@angular/core';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {InvoiceReuseForm} from '../../../../../shell/components/form/admin/invoice-reuse-form/invoice-reuse-form';
import {PriceReuseForm} from '../../../../../shell/components/form/admin/price-reuse-form/price-reuse-form';
import {PlanReuseForm} from '../../../../../shell/components/form/admin/plan-reuse-form/plan-reuse-form';

@Component({
  selector: 'app-price-create',
  imports: [
    Breadcrumb,
    InvoiceReuseForm,
    PriceReuseForm,
    PlanReuseForm
  ],
  templateUrl: './price-create.html',
  styleUrl: './price-create.css',
})
export class PriceCreate {

}
