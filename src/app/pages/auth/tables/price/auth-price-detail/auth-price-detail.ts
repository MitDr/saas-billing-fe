import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthPrice} from '../../../../../core/interface/entity/auth/auth-price';
import {AuthPriceService} from '../../../../../core/service/auth/auth-price-service';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {PriceCard} from '../../../../../shell/components/card/price/price-card/price-card';
import {AuthPriceCard} from '../../../../../shell/components/card/auth/auth-price-card/auth-price-card';

@Component({
  selector: 'app-auth-price-detail',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    PriceCard,
    RouterLink,
    AuthPriceCard
  ],
  templateUrl: './auth-price-detail.html',
  styleUrl: './auth-price-detail.css',
})
export class AuthPriceDetail {
  loading = signal(false);
  price = signal<AuthPrice | null>(null);
  priceService = inject(AuthPriceService);
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
        this.router.navigate(['/app/tables/prices'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
