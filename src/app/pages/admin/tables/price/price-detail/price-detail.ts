import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Price} from '../../../../../core/interface/entity/price';
import {PriceService} from '../../../../../core/service/price-service';
import {FeatureCard} from '../../../../../shell/components/card/feature/feature-card/feature-card';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {PriceCard} from '../../../../../shell/components/card/price/price-card/price-card';

@Component({
  selector: 'app-price-detail',
  imports: [
    FeatureCard,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    PriceCard
  ],
  templateUrl: './price-detail.html',
  styleUrl: './price-detail.css',
})
export class PriceDetail {
  loading = signal(false);
  price = signal<Price | null>(null);
  priceService = inject(PriceService);
  router = inject(Router);
  message = inject(NzMessageService)
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadPrice(+id)
      }
    });
  }

  loadPrice(id: number) {
    this.loading.set(true);
    this.priceService.getPrice(id).subscribe({
      next: (response) => {
        this.price.set(response);
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
    this.priceService.deletePrice(id).subscribe({
      next: (response) => {
        this.message.success('price deleted successfully');
        this.router.navigate(['/admin/tables/prices'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
