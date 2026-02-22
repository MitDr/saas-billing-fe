import {Component, inject, input, output} from '@angular/core';
import {User} from '../../../../../core/interface/entity/user';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-dto-card',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent
  ],
  templateUrl: './user-dto-card.html',
  styleUrl: './user-dto-card.css',
})
export class UserDtoCard {
  user = input.required<User>();
  numberOfColumn = input<number>(2);

  modalService = inject(NzModalService);
  planRemove = output<number>();
  userRemove = output<number>();

  onRemoveUser() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa Entitlement #${this.user().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.planRemove.emit(this.user().id);
      }
    });
  }
}
