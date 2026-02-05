import {ROLE_OPTIONS} from '../../pages/admin/tables/user/user-list/user-list';
import {User} from '../interface/user';
import {ColumnConfig} from '../interface/column-config';

export const USER_COLUMNS: ColumnConfig<User>[] = [
  {
    key: 'username',
    title: 'Username',
    editable: true
  },
  {
    key: 'email',
    title: 'Email',
    editable: true
  },
  {
    key: 'role',
    title: 'Role',
    type: 'select',
    options: ROLE_OPTIONS,
    editable: true
  },
  {
    key: 'createdDate',
    title: 'Created'
  },
  {
    key: 'modifiedDate',
    title: 'Modified'
  }
];
