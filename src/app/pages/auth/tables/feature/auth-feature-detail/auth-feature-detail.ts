import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthFeature} from '../../../../../core/interface/entity/auth/auth-feature';
import {AuthFeatureService} from '../../../../../core/service/auth/auth-feature-service';
import {FeatureCard} from '../../../../../shell/components/card/feature/feature-card/feature-card';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {AuthFeatureCard} from '../../../../../shell/components/card/auth/auth-feature-card/auth-feature-card';

@Component({
  selector: 'app-auth-feature-detail',
  imports: [
    FeatureCard,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    AuthFeatureCard
  ],
  templateUrl: './auth-feature-detail.html',
  styleUrl: './auth-feature-detail.css',
})
export class AuthFeatureDetail {
  loading = signal(false);
  feature = signal<AuthFeature | null>(null);
  featureService = inject(AuthFeatureService);
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
        this.router.navigate(['/app/tables/features'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
