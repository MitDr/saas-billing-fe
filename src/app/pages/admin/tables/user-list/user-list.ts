import {Component, input} from '@angular/core';
import {User} from '../../../../core/interface/user';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-user-list',
  imports: [
    NzCardComponent,
    NzTableModule,
    NzTagComponent,
    NzPopconfirmDirective,
    NzButtonComponent,
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  users:User[]=FAKE_USERS;

  checked= false;
  loading= false;
  indeterminate = false;
  listOfCurrentData:User[] = [];
  setOfCheckedId= new Set<number>;

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
}

export const FAKE_USERS: User[] = [
  {
    id: 2,
    username: 'alice',
    email: 'alice@gmail.com',
    role: 'USER',
    createdDate: '05-10-2025 09:10:12',
    modifiedDate: '06-10-2025 11:22:40'
  },
  {
    id: 3,
    username: 'bob',
    email: 'bob@gmail.com',
    role: 'USER',
    createdDate: '01-10-2025 08:45:00',
    modifiedDate: '01-10-2025 08:45:00'
  },
  {
    id: 2,
    username: 'alice',
    email: 'alice@gmail.com',
    role: 'USER',
    createdDate: '05-10-2025 09:10:12',
    modifiedDate: '06-10-2025 11:22:40'
  },
  {
    id: 3,
    username: 'bob',
    email: 'bob@gmail.com',
    role: 'USER',
    createdDate: '01-10-2025 08:45:00',
    modifiedDate: '01-10-2025 08:45:00'
  },
  {
    id: 2,
    username: 'alice',
    email: 'alice@gmail.com',
    role: 'USER',
    createdDate: '05-10-2025 09:10:12',
    modifiedDate: '06-10-2025 11:22:40'
  },
  {
    id: 3,
    username: 'bob',
    email: 'bob@gmail.com',
    role: 'USER',
    createdDate: '01-10-2025 08:45:00',
    modifiedDate: '01-10-2025 08:45:00'
  },
  {
    id: 2,
    username: 'alice',
    email: 'alice@gmail.com',
    role: 'USER',
    createdDate: '05-10-2025 09:10:12',
    modifiedDate: '06-10-2025 11:22:40'
  },
  {
    id: 3,
    username: 'bob',
    email: 'bob@gmail.com',
    role: 'USER',
    createdDate: '01-10-2025 08:45:00',
    modifiedDate: '01-10-2025 08:45:00'
  },
  {
    id: 2,
    username: 'alice',
    email: 'alice@gmail.com',
    role: 'USER',
    createdDate: '05-10-2025 09:10:12',
    modifiedDate: '06-10-2025 11:22:40'
  },
  {
    id: 3,
    username: 'bob',
    email: 'bob@gmail.com',
    role: 'USER',
    createdDate: '01-10-2025 08:45:00',
    modifiedDate: '01-10-2025 08:45:00'
  },
  {
    id: 2,
    username: 'alice',
    email: 'alice@gmail.com',
    role: 'USER',
    createdDate: '05-10-2025 09:10:12',
    modifiedDate: '06-10-2025 11:22:40'
  },
  {
    id: 3,
    username: 'bob',
    email: 'bob@gmail.com',
    role: 'USER',
    createdDate: '01-10-2025 08:45:00',
    modifiedDate: '01-10-2025 08:45:00'
  },
  {
    id: 2,
    username: 'alice',
    email: 'alice@gmail.com',
    role: 'USER',
    createdDate: '05-10-2025 09:10:12',
    modifiedDate: '06-10-2025 11:22:40'
  },
  {
    id: 3,
    username: 'bob',
    email: 'bob@gmail.com',
    role: 'USER',
    createdDate: '01-10-2025 08:45:00',
    modifiedDate: '01-10-2025 08:45:00'
  },
  {
    id: 2,
    username: 'alice',
    email: 'alice@gmail.com',
    role: 'USER',
    createdDate: '05-10-2025 09:10:12',
    modifiedDate: '06-10-2025 11:22:40'
  },
  {
    id: 3,
    username: 'bob',
    email: 'bob@gmail.com',
    role: 'USER',
    createdDate: '01-10-2025 08:45:00',
    modifiedDate: '01-10-2025 08:45:00'
  }
];

