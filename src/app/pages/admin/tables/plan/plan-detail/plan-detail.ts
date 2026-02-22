import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Plan} from '../../../../../core/interface/entity/plan';
import {PlanService} from '../../../../../core/service/plan-service';
import {EntitlementCard} from '../../../../../shell/components/card/entitlement/entitlement-card/entitlement-card';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {PlanCard} from '../../../../../shell/components/card/plan/plan-card/plan-card';

@Component({
  selector: 'app-plan-detail',
  imports: [
    EntitlementCard,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    PlanCard
  ],
  templateUrl: './plan-detail.html',
  styleUrl: './plan-detail.css',
})
export class PlanDetail {
  loading = signal(false);
  plan = signal<Plan | null>(null);
  planService = inject(PlanService);
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
        this.router.navigate(['/admin/tables/plans'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
