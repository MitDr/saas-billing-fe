import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Feature} from '../../../../../core/interface/entity/feature';
import {FeatureService} from '../../../../../core/service/feature-service';
import {EntitlementCard} from '../../../../../shell/components/card/entitlement/entitlement-card/entitlement-card';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {FeatureCard} from '../../../../../shell/components/card/feature/feature-card/feature-card';

@Component({
  selector: 'app-feature-detail',
  imports: [
    EntitlementCard,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    FeatureCard
  ],
  templateUrl: './feature-detail.html',
  styleUrl: './feature-detail.css',
})
export class FeatureDetail {
  loading = signal(false);
  feature = signal<Feature | null>(null);
  featureService = inject(FeatureService);
  router = inject(Router);
  message = inject(NzMessageService)
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadFeature(+id)
      }
    });
  }


  loadFeature(id: number) {
    this.loading.set(true);
    this.featureService.getFeature(id).subscribe({
      next: (response) => {
        this.feature.set(response);
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
    this.featureService.deleteFeature(id).subscribe({
      next: (response) => {
        this.message.success('feature deleted successfully');
        this.router.navigate(['/admin/tables/features'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
