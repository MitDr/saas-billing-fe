import {Component, input} from '@angular/core';
import {User} from '../../../../../core/interface/entity/user';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {AuthUser} from '../../../../../core/interface/entity/auth/auth-user';

@Component({
  selector: 'app-auth-user-card',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzIconDirective,
    NzTagComponent
  ],
  templateUrl: './auth-user-card.html',
  styleUrl: './auth-user-card.css',
})
export class AuthUserCard {
  user = input.required<AuthUser>();
}
