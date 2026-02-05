import {Component, input} from '@angular/core';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzAvatarComponent} from 'ng-zorro-antd/avatar';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {User} from '../../../../../core/interface/user';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-user-card',
  imports: [
    NzCardComponent,
    NzAvatarComponent,
    NzDescriptionsItemComponent,
    NzDescriptionsComponent,
    NzButtonComponent,
    RouterLink,
    NzTagComponent,
    NzIconDirective
  ],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  user = input.required<User>();
  deleteButton = input.required<boolean>();
}
