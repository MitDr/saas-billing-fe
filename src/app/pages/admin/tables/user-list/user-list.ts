import {Component, input, OnInit, signal} from '@angular/core';
import {User} from '../../../../core/interface/user';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';

@Component({
  selector: 'app-user-list',
  imports: [
    NzTableModule,
    NzTagComponent,
    NzPopconfirmDirective,
    NzButtonComponent,
    NzInputDirective,
    FormsModule,
    NzOptionComponent,
    NzSelectComponent,
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit{

  users:User[]=FAKE_USERS;

  checked= false;
  loading= false;
  indeterminate = false;
  listOfCurrentData:User[] = [];
  setOfCheckedId= new Set<number>;
  editing = signal(false);
  ROLE = ROLE_OPTIONS

  editCache: {
    [key: string]:{
      edit: boolean;
      data: User
    }
  } = {}

  updateCheckedSet(id:number, checked:boolean){
    if (checked){
      this.setOfCheckedId.add(id);
    }
    else{
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: User[]){
    this.listOfCurrentData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(){
    const listOfEnabledData = this.listOfCurrentData;
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.users
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  startEdit(id: number){
    this.editCache[id].edit = true;
    this.editing.update(()=>true);
  }

  cancelEdit(id: number){
    const index = this.users.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: {...this.users[index]
      },
      edit: false
    };
    this.editing.update(()=>false);
  }

  saveEdit(id: number){
    const index = this.users.findIndex(item => item.id === id);
    Object.assign(this.users[index], this.editCache[id].data);
    this.editCache[id].edit = false;
    this.editing.update(()=>false)
  }

  updateEditCache(){
    this.users.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  ngOnInit(): void {
    this.updateEditCache();
  }

  multipleDelete(){
    console.log("Delete");
  }
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
  { label: 'Admin', value: 'ADMIN', color: 'blue' },
  { label: 'User', value: 'USER', color: 'green' }
];

