import {Component, effect, inject, signal} from '@angular/core';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {UserCard} from '../../../../../shell/components/card/user/user-card/user-card';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {UserService} from '../../../../../core/service/user.service';
import {User} from '../../../../../core/interface/entity/user';
import {NzMessageService} from 'ng-zorro-antd/message';
import {UserDtoCard} from '../../../../../shell/components/card/DTO/user-dto-card/user-dto-card';

@Component({
  selector: 'app-user-detail',
  imports: [
    NzPageHeaderComponent,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    UserCard,
    NzSpinComponent,
    RouterLink,
    UserDtoCard
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail {
  loading = signal(false);
  user = signal<User | null>(null);
  userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private message = inject(NzMessageService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadUser(+id)
      }
    });
  }

  loadUser(id: number) {
    this.loading.set(true);
    this.userService.getUser(id).subscribe({
      next: (response) => {
        this.user.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  deleteUser(id: number) {
    this.loading.set(true);
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.loading.set(false);
        this.message.success('User deleted successfully');
        this.router.navigate(['/admin/tables/users'])
      },
      error: (err) => {
        console.error(err);
        this.router.navigate(['/admin/tables/users'])
      }
    });
  }

}
