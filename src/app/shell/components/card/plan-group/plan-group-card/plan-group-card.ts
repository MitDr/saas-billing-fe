import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {PlanGroup} from '../../../../../core/interface/entity/plan-group';
import {PlanGroupService} from '../../../../../core/service/plan-group-service';
import {PlanGroupRequest} from '../../../../../core/interface/request/plan-group-request';
import {EntitlementDtoCard} from '../../DTO/entitlement-dto-card/entitlement-dto-card';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {PlanDtoCard} from '../../DTO/plan-dto-card/plan-dto-card';
import {TenantDtoCard} from '../../DTO/tenant-dto-card/tenant-dto-card';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-plan-group-card',
  imports: [
    EntitlementDtoCard,
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent,
    PlanDtoCard,
    TenantDtoCard,
    RouterLink
  ],
  templateUrl: './plan-group-card.html',
  styleUrl: './plan-group-card.css',
})
export class PlanGroupCard {
  planGroup = input.required<PlanGroup>()
  // tenantService = inject(TenantService);
  deleteButton = output<number>();
  modalService = inject(NzModalService);
  planGroupService = inject(PlanGroupService)
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

  private removePlanAndMapPlanGroupToPlanGroupRequest(planGroup: PlanGroup, id: number) {
    const result: PlanGroupRequest = {
      name: planGroup.name,
      tenantId: planGroup.tenant.id
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
