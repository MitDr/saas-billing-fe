import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {PlanGroup} from '../../../../../core/interface/entity/plan-group';
import {PlanGroupService} from '../../../../../core/service/plan-group-service';
import {FeatureCard} from '../../../../../shell/components/card/feature/feature-card/feature-card';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {PlanGroupCard} from '../../../../../shell/components/card/plan-group/plan-group-card/plan-group-card';

@Component({
  selector: 'app-plan-group-detail',
  imports: [
    FeatureCard,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    PlanGroupCard
  ],
  templateUrl: './plan-group-detail.html',
  styleUrl: './plan-group-detail.css',
})
export class PlanGroupDetail {
  loading = signal(false);
  planGroup = signal<PlanGroup | null>(null);
  planGroupService = inject(PlanGroupService);
  router = inject(Router);
  message = inject(NzMessageService)
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadPlanGroup(+id)
      }
    });
  }

  loadPlanGroup(id: number) {
    this.loading.set(true);
    this.planGroupService.getPlanGroup(id).subscribe({
      next: (response) => {
        this.planGroup.set(response);
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
    this.planGroupService.deletePlanGroup(id).subscribe({
      next: (response) => {
        this.message.success('Plan group deleted successfully');
        this.router.navigate(['/admin/tables/plan-groups'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
