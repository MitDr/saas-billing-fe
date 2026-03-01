import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthPlanGroup} from '../../../../../core/interface/entity/auth/auth-plan-group';
import {AuthPlanGroupService} from '../../../../../core/service/auth/auth-plan-group-service';
import {AuthPlanGroupRequest} from '../../../../../core/interface/request/auth/auth-plan-group-request';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {PlanDtoCard} from '../../DTO/plan-dto-card/plan-dto-card';
import {RouterLink} from '@angular/router';
import {AuthPlanDtoCard} from '../../DTO/auth/auth-plan-dto-card/auth-plan-dto-card';

@Component({
  selector: 'app-auth-plan-group-card',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    PlanDtoCard,
    RouterLink,
    AuthPlanDtoCard
  ],
  templateUrl: './auth-plan-group-card.html',
  styleUrl: './auth-plan-group-card.css',
})
export class AuthPlanGroupCard {
  planGroup = input.required<AuthPlanGroup>()
  // tenantService = inject(TenantService);
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  planGroupService = inject(AuthPlanGroupService)
  load = output<number>();
  private message = inject(NzMessageService);

  onDelete() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa Plan Group #${this.planGroup().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteButton.emit(this.planGroup().id);
      }
    });
  }

  onPlanRemoved(id: number) {
    this.planGroupService.update(this.removePlanAndMapPlanGroupToPlanGroupRequest(this.planGroup(), id), this.planGroup().id).subscribe({
      next: () => {
        this.message.success('Updated successfully');
        this.load.emit(this.planGroup().id);
      },
      error: () => {
        this.message.error('Update failed');
        this.load.emit(this.planGroup().id);
      }
    });
  }

  private removePlanAndMapPlanGroupToPlanGroupRequest(planGroup: AuthPlanGroup, id: number) {
    const result: AuthPlanGroupRequest = {
      name: planGroup.name,
    }
    if (planGroup.description) {
      result.description = planGroup.description
    }
    if (planGroup.plans.length > 0) {
      result.plans = planGroup.plans
        .filter(planGroup => planGroup.id !== id)
        .map(planGroup => planGroup.id);
    }
    return result;
  }

}
