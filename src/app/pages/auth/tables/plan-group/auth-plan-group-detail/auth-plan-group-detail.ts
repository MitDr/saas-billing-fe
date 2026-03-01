import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthPlanGroup} from '../../../../../core/interface/entity/auth/auth-plan-group';
import {AuthPlanGroupService} from '../../../../../core/service/auth/auth-plan-group-service';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {PlanGroupCard} from '../../../../../shell/components/card/plan-group/plan-group-card/plan-group-card';
import {AuthPlanGroupCard} from '../../../../../shell/components/card/auth/auth-plan-group-card/auth-plan-group-card';

@Component({
  selector: 'app-auth-plan-group-detail',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    PlanGroupCard,
    RouterLink,
    AuthPlanGroupCard
  ],
  templateUrl: './auth-plan-group-detail.html',
  styleUrl: './auth-plan-group-detail.css',
})
export class AuthPlanGroupDetail {
  loading = signal(false);
  planGroup = signal<AuthPlanGroup | null>(null);
  planGroupService = inject(AuthPlanGroupService);
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
        this.router.navigate(['/app/tables/plan-groups'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
