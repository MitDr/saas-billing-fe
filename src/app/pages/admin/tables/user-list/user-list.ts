import {Component, signal} from '@angular/core';
import {User} from '../../../../core/interface/user';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzOptionComponent} from 'ng-zorro-antd/select';
import {EditableDataTable} from '../../../../shell/components/editable-data-table/editable-data-table';
import {ColumnConfig} from '../../../../core/interface/column-config';
import {USER_ROUTE_CONSTANT} from '../../../../core/constant/user-list-constant';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [
    NzTableModule,
    NzButtonComponent,
    FormsModule,
    EditableDataTable,
    RouterLink,
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  users = signal<User[]>(FAKE_USERS);
  checked = false;
  createRoute = '/admin/tables/users/create'
  userListRouting = USER_ROUTE_CONSTANT;
  protected readonly USER_COLUMNS: ColumnConfig<User>[] = [
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

  onSaveUser(updatedUser: User) {
    // gọi API hoặc update signal
    this.users.update(list =>
      list.map(u => u.id === updatedUser.id ? updatedUser : u)
    );
  }

  onDeleteUser(user: User) {
    this.users.update(list => list.filter(u => u.id !== user.id));
  }

  onBulkDelete(ids: number[]) {
    this.users.update(list =>
      list.filter(u => !ids.includes(u.id))
    );
  }


  // users: User[] = FAKE_USERS;
  // loading = false;
  // indeterminate = false;
  // listOfCurrentData: User[] = [];
  // setOfCheckedId = new Set<number>;
  // editing = signal(false);
  // ROLE = ROLE_OPTIONS
  // editCache: {
  //   [key: string]: {
  //     edit: boolean;
  //     data: User
  //   }
  // } = {}
  // checked = false;
  // // }
  // protected readonly USER_COLUMN = USER_COLUMNS;
  //
  // updateCheckedSet(id: number, checked: boolean) {
  //   if (checked) {
  //     this.setOfCheckedId.add(id);
  //   } else {
  //     this.setOfCheckedId.delete(id);
  //   }
  // }
  //
  // onCurrentPageDataChange(listOfCurrentPageData: User[]) {
  //   this.listOfCurrentData = listOfCurrentPageData;
  //   this.refreshCheckedStatus();
  // }
  //
  // refreshCheckedStatus() {
  //   const listOfEnabledData = this.listOfCurrentData;
  //   this.checked = listOfEnabledData.every(({id}) => this.setOfCheckedId.has(id));
  //   this.indeterminate = listOfEnabledData.some(({id}) => this.setOfCheckedId.has(id)) && !this.checked;
  // }
  //
  // onItemChecked(id: number, checked: boolean): void {
  //   this.updateCheckedSet(id, checked);
  //   this.refreshCheckedStatus();
  // }
  //
  // onAllChecked(checked: boolean): void {
  //   this.users
  //     .forEach(({id}) => this.updateCheckedSet(id, checked));
  //   this.refreshCheckedStatus();
  // }
  //
  // startEdit(id: number) {
  //   this.editCache[id].edit = true;
  //   this.editing.update(() => true);
  // }
  //
  // cancelEdit(id: number) {
  //   const index = this.users.findIndex(item => item.id === id);
  //   this.editCache[id] = {
  //     data: {
  //       ...this.users[index]
  //     },
  //     edit: false
  //   };
  //   this.editing.update(() => false);
  // }
  //
  // saveEdit(id: number) {
  //   const index = this.users.findIndex(item => item.id === id);
  //   Object.assign(this.users[index], this.editCache[id].data);
  //   this.editCache[id].edit = false;
  //   this.editing.update(() => false)
  // }
  //
  // updateEditCache() {
  //   this.users.forEach(item => {
  //     this.editCache[item.id] = {
  //       edit: false,
  //       data: {...item}
  //     };
  //   });
  // }
  //
  // ngOnInit(): void {
  //   this.updateEditCache();
  // }
  //
  // multipleDelete() {
  //   console.log("Delete");
  // }
  //
  // onSave(event: { row: User }) {
  //   console.log('Nhận từ table:', event.row);
  //
  //   // Sau này thay bằng gọi API
  //   const index = this.users.findIndex(u => u.id === event.row.id);
  //
  //   if (index !== -1) {
  //     this.users[index] = event.row;
  //   }
  // }
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

