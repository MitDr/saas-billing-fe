import {Component, effect, inject, signal} from '@angular/core';
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
import {NzMessageService} from 'ng-zorro-antd/message';
import {Feature} from '../../../../../core/interface/entity/feature';

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
  // State phân trang
  currentPage = signal(1);   // 1-based (khớp API)
  pageSize = signal(5);
  userPageResponse = signal<ListData<User> | null>(null);
  loading = signal(false);
  // users = signal<User[]>(FAKE_USERS);
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
  // }
  private userService = inject(UserService);
  private message = inject(NzMessageService);

  // Tương tự cho delete và bulk delete


  // page = signal(0);           // page 0-based (API dùng 0)
  // size = signal(10);
  // users = signal<ListData<User>>(FAKE_USER)
  // loading = signal(false);

  // Columns giữ nguyên
  constructor() {
    // Effect tự động load khi currentPage hoặc pageSize thay đổi
    effect(() => {
      // Lấy giá trị để effect phụ thuộc
      const page = this.currentPage();
      const size = this.pageSize();

      // console.log('[EFFECT] Reload features - page:', page, 'size:', size);
      this.loadUsers(page, size);
    });
  }

  loadUsers(page:number, size:number) {
    this.loading.set(true);
    // API page 1-based, nhưng backend thường 0-based → -1
    this.userService.getUsers(this.currentPage(), this.pageSize()).subscribe({
      next: (response) => {
        this.userPageResponse.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.message.error('Không thể tải danh sách user');
        console.error(err);
      }
    });
  }

// Khi đổi trang
  onPageChange(newPage: number) {
    console.log('[PAGE] Changed to:', newPage);
    this.currentPage.set(newPage);
    // Không cần gọi loadFeatures nữa → effect tự chạy
  }

  // Khi đổi size
  onSizeChange(newSize: number) {
    console.log('[SIZE] Changed to:', newSize);
    this.pageSize.set(newSize);
    this.currentPage.set(1); // reset về trang 1
    // Effect tự reload
  }

  onSaveRow(updateUser: User) {
    // this.userService.updateUser(updatedUser).subscribe({
    //   next: () => {
    //     this.message.success('Cập nhật thành công');
    //     this.loadUsers();  // ← gọi lại API load toàn bộ list
    //   },
    //   error: () => {
    //     this.message.error('Cập nhật thất bại');
    //     // Optional: rollback cache nếu cần
    //   }
    // });
    console.log('calling api')
  }

  onBulkDelete(ids: number[]) {
    // if (ids.length === 0) return;
    //
    // this.modal.confirm({
    //   nzTitle: 'Xác nhận xóa',
    //   nzContent: `Xóa ${ids.length} feature?`,
    //   nzOkText: 'Xóa',
    //   nzOkDanger: true,
    //   nzOnOk: () => {
    //     this.featureService.bulkDelete(ids).subscribe({
    //       next: () => {
    //         this.message.success('Xóa thành công');
    //         this.currentPage.set(this.currentPage()); // trigger reload
    //       },
    //       error: () => this.message.error('Xóa thất bại')
    //     });
    //   }
    // });
  }

  onSaveUser(updatedUser: User) {
  //   // gọi API hoặc update signal
  //   this.users.update(list =>
  //     list.map(u => u.id === updatedUser.id ? updatedUser : u)
  //   );
  // }
  //
  // onDeleteUser(user: User) {
  //   this.users.update(list => list.filter(u => u.id !== user.id));
  // }
  //
  // onBulkDelete(ids: number[]) {
  //   this.users.update(list =>
  //     list.filter(u => !ids.includes(u.id))
  //   );
  }

  //
  // loadTenants(page: number, size: number) {
  //   this.loading.set(true);
  //   this.tenantService.getTenants(page, size).subscribe({
  //     next: (res) => {
  //       this.tenantsData.set(res.data);  // giả sử res.data là phần phân trang
  //       this.loading.set(false);
  //     },
  //     error: () => this.loading.set(false),
  //   });
  // }

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

  // onSaveRow(updatedUser: User) {
    // this.userService.updateUser(updatedUser).subscribe({
    //   next: () => {
    //     this.message.success('Cập nhật thành công');
    //     this.loadUsers();  // ← gọi lại API load toàn bộ list
    //   },
    //   error: () => {
    //     this.message.error('Cập nhật thất bại');
    //     // Optional: rollback cache nếu cần
    //   }
    // });
    // console.log('calling api')
  // }
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

