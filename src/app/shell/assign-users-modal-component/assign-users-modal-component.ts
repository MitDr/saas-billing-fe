import {Component, Inject, inject, OnInit, signal} from '@angular/core';
import {User} from '../../core/interface/entity/user';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';
import {NZ_MODAL_DATA, NzModalRef} from 'ng-zorro-antd/modal';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-assign-users-modal-component',
  imports: [
    NzInputDirective,
    FormsModule,
    NzTableComponent,
    NzCheckboxComponent,
    NzCardComponent,
    NzCardMetaComponent,
    NzButtonComponent
  ],
  templateUrl: './assign-users-modal-component.html',
  styleUrl: './assign-users-modal-component.css',
})
export class AssignUsersModalComponent implements OnInit {
  availableUsers = signal<User[]>([]);
  setOfCheckedId = signal<Set<number>>(new Set());

  searchValue = '';
  filteredUsers = signal<User[]>([]);

  modalRef = inject(NzModalRef);

  constructor(@Inject(NZ_MODAL_DATA) data: { availableUsers: User[], selectedIds: number[] }) {
    console.log('[MODAL DEBUG] Data received in constructor:', data); // debug data ngay

    this.availableUsers.set(data.availableUsers || []);
    this.setOfCheckedId.set(new Set(data.selectedIds || []));
  }

  ngOnInit() {
    console.log('[MODAL DEBUG] Available users in ngOnInit:', this.availableUsers().length);
    this.filteredUsers.set(this.availableUsers());
  }

  filterUsers() {
    const lowerSearch = this.searchValue.toLowerCase();
    this.filteredUsers.set(
      this.availableUsers().filter(u =>
        u.username.toLowerCase().includes(lowerSearch) ||
        u.email.toLowerCase().includes(lowerSearch)
      )
    );
  }

  onItemChecked(id: number, checked: boolean) {
    this.setOfCheckedId.update(set => {
      if (checked) set.add(id);
      else set.delete(id);
      return new Set(set);
    });
  }

  onOk() {
    const selectedIds = Array.from(this.setOfCheckedId());
    console.log('Selected User IDs:', selectedIds);
    this.modalRef.close(selectedIds);
  }

  getSelectedIds(): number[] {
    return Array.from(this.setOfCheckedId());
  }
}
