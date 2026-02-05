import {Component, effect, inject, signal} from '@angular/core';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {UserCard} from '../../../../../shell/components/card/user/user-card/user-card';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {User} from '../../../../../core/interface/user';
import {FAKE_USERS} from '../user-list/user-list';

@Component({
  selector: 'app-user-detail',
  imports: [
    NzPageHeaderComponent,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    UserCard,
    NzSpinComponent,
    RouterLink
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail {
  private route = inject(ActivatedRoute);

  user = signal<User | null>(null);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        const found = FAKE_USERS.find(u => u.id === +id);
        this.user.set(found || null);
      }
    });
  }
}
