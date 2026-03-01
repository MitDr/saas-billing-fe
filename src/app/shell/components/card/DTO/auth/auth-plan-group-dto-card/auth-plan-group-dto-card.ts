import {Component, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthPlanGroupDto} from '../../../../../../core/interface/DTO/auth/auth-plan-group-dto';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-auth-plan-group-dto-card',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective
  ],
  templateUrl: './auth-plan-group-dto-card.html',
  styleUrl: './auth-plan-group-dto-card.css',
})
export class AuthPlanGroupDtoCard {
  planGroup = input.required<AuthPlanGroupDto>();
  numberOfColumn = input<number>(2);

  removable = input<boolean>(false);
  modalService = inject(NzModalService);
  featureRemove = output<number>();
  private message = inject(NzMessageService);

  onPlanGroupRemove() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa plan group #${this.planGroup().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.featureRemove.emit(this.planGroup().id);
      }
    });
  }
}
