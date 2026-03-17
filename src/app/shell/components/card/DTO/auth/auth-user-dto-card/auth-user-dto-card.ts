import {Component, computed, inject, input, output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {AuthUserDto} from '../../../../../../core/interface/DTO/auth/auth-user-dto';

export interface AuthUserDtoCardInterface {
  user: AuthUserDto,
  creator: boolean
}

@Component({
  selector: 'app-auth-user-dto-card',
  imports: [
    NzCardComponent,
    NzButtonComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent
  ],
  templateUrl: './auth-user-dto-card.html',
  styleUrl: './auth-user-dto-card.css',
})
export class AuthUserDtoCard {
  user = input.required<AuthUserDtoCardInterface>();
  numberOfColumn = input<number>(2);
  creator = input<boolean>(false);

  modalService = inject(NzModalService);
  userRemove = output<string>();

  userInfo = computed(() => this.user().user);
  isCreator = computed(() => this.user().creator);

  onRemoveUser() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Xóa User #${this.userInfo().id} ?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.userRemove.emit(this.userInfo().email);
      }
    });
  }
}
