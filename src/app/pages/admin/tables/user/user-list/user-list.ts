import {Component, inject, Signal, signal} from '@angular/core';
import {User} from '../../../../../core/interface/entity/user';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {FormsModule} from '@angular/forms';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {ColumnConfig} from '../../../../../core/interface/column-config';
import {USER_ROUTE_CONSTANT} from '../../../../../core/constant/user/user-list-constant';
import {RouterLink} from '@angular/router';
import {ListData} from '../../../../../core/interface/list-data';
import {UserService} from '../../../../../core/service/user.service';
import {UserRequest} from '../../../../../core/interface/request/user-request';
import {GenericListComponent} from '../../../../../core/generic/base-list-component';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';

@Component({
  selector: 'app-user-list',
  imports: [
    NzTableModule,
    NzButtonComponent,
    FormsModule,
    EditableDataTable,
    RouterLink,
    NzInputDirective,
    NzInputWrapperComponent,
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList extends GenericListComponent<User, UserRequest> {
  // State phân trang
  userPageResponse = signal<ListData<User> | null>(null);
  checked = false;
  createRoute = '/admin/tables/users/create'
  userListRouting = USER_ROUTE_CONSTANT;
  private userService = inject(UserService);

  getDataPage(): Signal<ListData<User> | null> {
    return this.userPageResponse;
  }

  override getColumns(): ColumnConfig<User>[] {
    return [
      {key: 'id', title: 'Id', editable: false},
      {key: 'username', title: 'Username', editable: true, type: 'text'},
      {key: 'email', title: 'Email', editable: true, type: 'text'},
      {
        key: 'role',
        title: 'Role',
        editable: true,
        type: 'select',
        options: ROLE_OPTIONS
      },
      {key: 'createdDate', title: 'Created Date', editable: false},
      {key: 'modifiedDate', title: 'Modified Date', editable: false},
    ];
  }

  getCreateRoute(): string {
    return this.createRoute;
  }

  getRoutingConstant(): any {
    return this.userListRouting;
  }

  getService() {
    return this.userService;
  }

  onSearchChange(value: string) {
    if (value !== this.search()) {
      this.searchSubject.next(value);
    }
  }

  protected loadData(
    page: number,
    size: number,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort?: string
  ): void {
    this.loading.set(true);
    this.userService.getUsers(page, size, search).subscribe({
      next: (response) => {
        this.userPageResponse.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Không thể tải danh sách users');
        this.loading.set(false);
      }
    });
  }

  protected mapToUpdatePayload(user: User): UserRequest {
    const result: UserRequest = {
      username: user.username,
      email: user.email,
      role: user.role
    };
    return result
  }

}

export const FAKE_USER: ListData<User> = {
  "content": [
    {
      "id": 6,
      "username": "Lonnng5",
      "email": "ttlong13015@gmail.com",
      "role": "USER",
      "createdDate": "07-10-2025 21:16:51",
      "modifiedDate": "08-01-2026 21:20:34"
    },
    {
      "id": 5,
      "username": "Lonnng4",
      "email": "ttlong13014@gmail.com",
      "role": "USER",
      "createdDate": "07-10-2025 21:16:47",
      "modifiedDate": "07-10-2025 21:24:24"
    },
    {
      "id": 4,
      "username": "Lonnng3",
      "email": "ttlong13013@gmail.com",
      "role": "USER",
      "createdDate": "07-10-2025 21:16:43",
      "modifiedDate": "07-10-2025 21:24:15"
    },
    {
      "id": 3,
      "username": "Lonnng2",
      "email": "ttlong13012@gmail.com",
      "role": "USER",
      "createdDate": "07-10-2025 21:16:40",
      "modifiedDate": "07-10-2025 21:22:15"
    },
    {
      "id": 2,
      "username": "Lonnng1",
      "email": "ttlong13011@gmail.com",
      "role": "USER",
      "createdDate": "07-10-2025 21:16:36",
      "modifiedDate": "07-10-2025 21:17:36"
    },
    {
      "id": 1,
      "username": "Lonnng",
      "email": "ttlong1301@gmail.com",
      "role": "ADMIN",
      "createdDate": "07-10-2025 21:16:32",
      "modifiedDate": "07-10-2025 21:16:32"
    },
    {
      "id": 4,
      "username": "Lonnng3",
      "email": "ttlong13013@gmail.com",
      "role": "USER",
      "createdDate": "07-10-2025 21:16:43",
      "modifiedDate": "07-10-2025 21:24:15"
    },
    {
      "id": 3,
      "username": "Lonnng2",
      "email": "ttlong13012@gmail.com",
      "role": "USER",
      "createdDate": "07-10-2025 21:16:40",
      "modifiedDate": "07-10-2025 21:22:15"
    },
    {
      "id": 2,
      "username": "Lonnng1",
      "email": "ttlong13011@gmail.com",
      "role": "USER",
      "createdDate": "07-10-2025 21:16:36",
      "modifiedDate": "07-10-2025 21:17:36"
    },
    {
      "id": 1,
      "username": "Lonnng",
      "email": "ttlong1301@gmail.com",
      "role": "ADMIN",
      "createdDate": "07-10-2025 21:16:32",
      "modifiedDate": "07-10-2025 21:16:32"
    }
  ],
  "page": 1,
  "size": 10,
  "totalElements": 20,
  "totalPages": 2,
  "last": false
}
export const FAKE_USERS: User[] = [
  {
    id: 1,
    username: 'alice',
    email: 'alice@gmail.com',
    role: 'USER',
    createdDate: '05-10-2025 09:10:12',
    modifiedDate: '06-10-2025 11:22:40'
  },
  {
    id: 2,
    username: 'bob',
    email: 'bob@gmail.com',
    role: 'USER',
    createdDate: '01-10-2025 08:45:00',
    modifiedDate: '01-10-2025 08:45:00'
  },
  {
    id: 3,
    username: 'alice',
    email: 'alice@gmail.com',
    role: 'USER',
    createdDate: '05-10-2025 09:10:12',
    modifiedDate: '06-10-2025 11:22:40'
  },
  {
    id: 4,
    username: 'bob',
    email: 'bob@gmail.com',
    role: 'USER',
    createdDate: '01-10-2025 08:45:00',
    modifiedDate: '01-10-2025 08:45:00'
  },
  {
    id: 5,
    username: 'alice',
    email: 'alice@gmail.com',
    role: 'USER',
    createdDate: '05-10-2025 09:10:12',
    modifiedDate: '06-10-2025 11:22:40'
  },
  {
    id: 6,
    username: 'bob',
    email: 'bob@gmail.com',
    role: 'USER',
    createdDate: '01-10-2025 08:45:00',
    modifiedDate: '01-10-2025 08:45:00'
  },
  {
    id: 7,
    username: 'alice',
    email: 'alice@gmail.com',
    role: 'USER',
    createdDate: '05-10-2025 09:10:12',
    modifiedDate: '06-10-2025 11:22:40'
  },
  {
    id: 8,
    username: 'bob',
    email: 'bob@gmail.com',
    role: 'USER',
    createdDate: '01-10-2025 08:45:00',
    modifiedDate: '01-10-2025 08:45:00'
  },
  {
    id: 9,
    username: 'alice',
    email: 'alice@gmail.com',
    role: 'USER',
    createdDate: '05-10-2025 09:10:12',
    modifiedDate: '06-10-2025 11:22:40'
  },
  {
    id: 10,
    username: 'bob',
    email: 'bob@gmail.com',
    role: 'USER',
    createdDate: '01-10-2025 08:45:00',
    modifiedDate: '01-10-2025 08:45:00'
  },
  {
    id: 11,
    username: 'alice',
    email: 'alice@gmail.com',
    role: 'USER',
    createdDate: '05-10-2025 09:10:12',
    modifiedDate: '06-10-2025 11:22:40'
  },
  {
    id: 12,
    username: 'bob',
    email: 'bob@gmail.com',
    role: 'USER',
    createdDate: '01-10-2025 08:45:00',
    modifiedDate: '01-10-2025 08:45:00'
  },
  {
    id: 13,
    username: 'alice',
    email: 'alice@gmail.com',
    role: 'USER',
    createdDate: '05-10-2025 09:10:12',
    modifiedDate: '06-10-2025 11:22:40'
  },
  {
    id: 14,
    username: 'bob',
    email: 'bob@gmail.com',
    role: 'USER',
    createdDate: '01-10-2025 08:45:00',
    modifiedDate: '01-10-2025 08:45:00'
  },
  {
    id: 15,
    username: 'alice',
    email: 'alice@gmail.com',
    role: 'USER',
    createdDate: '05-10-2025 09:10:12',
    modifiedDate: '06-10-2025 11:22:40'
  },
  {
    id: 16,
    username: 'bob',
    email: 'bob@gmail.com',
    role: 'USER',
    createdDate: '01-10-2025 08:45:00',
    modifiedDate: '01-10-2025 08:45:00'
  }
];

export type Role = 'ADMIN' | 'USER';

export const ROLE_OPTIONS = [
  {label: 'Admin', value: 'ADMIN', color: 'blue'},
  {label: 'User', value: 'USER', color: 'green'}
];

