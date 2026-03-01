import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthPlan} from '../../../../../core/interface/entity/auth/auth-plan';
import {AuthPlanService} from '../../../../../core/service/auth/auth-plan-service';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {PlanCard} from '../../../../../shell/components/card/plan/plan-card/plan-card';
import {AuthPlanCard} from '../../../../../shell/components/card/auth/auth-plan-card/auth-plan-card';

@Component({
  selector: 'app-auth-plan-detail',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    PlanCard,
    RouterLink,
    AuthPlanCard
  ],
  templateUrl: './auth-plan-detail.html',
  styleUrl: './auth-plan-detail.css',
})
export class AuthPlanDetail {
  loading = signal(false);
  plan = signal<AuthPlan | null>(null);
  planService = inject(AuthPlanService);
  router = inject(Router);
  message = inject(NzMessageService)
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadPlan(+id)
      }
    });
  }

  loadPlan(id: number) {
    this.loading.set(true);
    this.planService.getPlan(id).subscribe({
      next: (response) => {
        this.plan.set(response);
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
    this.planService.deletePlan(id).subscribe({
      next: (response) => {
        this.message.success('plans deleted successfully');
        this.router.navigate(['/app/tables/plans'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
