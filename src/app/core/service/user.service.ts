import {inject, Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {map, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from '../interface/entity/user';
import {ListData} from '../interface/list-data';
import {ApiClientService} from './api-client-service';
import {UserRequest} from '../interface/request/user-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api = inject(ApiClientService);

  addUser(userRequest: UserRequest): Observable<User> {
    return this.api.post<User>('/admin/users', userRequest).pipe(
      catchError(error => {
        console.error('Create user error:', error);
        return throwError(() => new Error('Không thể tạo user'));
      })
    )
  }

  getUsers(
    page: number = 1,
    size: number = 5,
    search?: string,
    sort: string = 'id,asc'
  ): Observable<ListData<User>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    if (search) {
      params = params.set('search', search);
    }

    return this.api.get<ListData<User>>('/admin/users', params);
  }

  getAllUsers(page: number = 0, size: number = 5): Observable<ListData<User>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,asc')
      .set('all', 'true')

    return this.api.get<ListData<User>>('/admin/users', params)
      .pipe(
        map(response => {
          return response as ListData<User>;
        }),
        catchError(error => {
          console.error('Get users error', error);
          return throwError(() => new Error('Không thể lấy danh sách users'))
        })
      )
  }

  getUser(id: number): Observable<User> {
    return this.api.get<User>(`/admin/users/${id}`).pipe(
      catchError(error => {
        console.error('Get user error:', error);
        return throwError(() => new Error('Không thể lấy user'));
      })
    );
  }
  update(updatedUser: UserRequest, id: number): Observable<User> {
    return this.api.put<User>(`/admin/users/${id}`, updatedUser).pipe(
      catchError(error => {
        console.error('Update user error:', error);
        return throwError(() => new Error('Cập nhật user thất bại'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/admin/users`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.api.delete<void>(`/admin/users/${id}`).pipe(
      catchError(error => {
        console.error('Delete user error:', error);
        return throwError(() => new Error('Xóa user thất bại'));
      })
    );
  }
}
