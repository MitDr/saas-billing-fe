// user.service.ts
import {inject, Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {map, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from '../interface/entity/user';
import {ListData} from '../interface/list-data';
import {ApiClientService} from './api-client-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api = inject(ApiClientService);

  getUsers(page: number = 0, size: number = 5): Observable<ListData<User>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,asc')
      .set('all', 'false')
    // .set()

    return this.api.get<ListData<User>>("/admin/users", params)
      .pipe(
        map(response => {
          // API của bạn trả { data: { content: ..., page: ..., ... } }
          return response as ListData<User>;
        }),
        catchError(error => {
          console.error('Get users error:', error);
          return throwError(() => new Error('Không thể lấy danh sách user'));
        })
      )

    // return this.http.get<any>(this.apiUrl, {headers, params}).pipe(
    //   map(response => {
    //     // API của bạn trả { data: { content: ..., page: ..., ... } }
    //     return response.content as ListData<User>;
    //   }),
    //   catchError(error => {
    //     console.error('Get users error:', error);
    //     return throwError(() => new Error('Không thể lấy danh sách user'));
    //   })
    // );
  }
// }

// Update một user (PUT)
  updateUser(updatedUser: User): Observable<User> {
    return this.api.put<User>(`/admin/users/${updatedUser.id}`, updatedUser).pipe(
      catchError(error => {
        console.error('Update user error:', error);
        return throwError(() => new Error('Cập nhật user thất bại'));
      })
    );
  }
//
//   // Delete một user (DELETE)
//   deleteUser(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
//       catchError(error => {
//         console.error('Delete user error:', error);
//         return throwError(() => new Error('Xóa user thất bại'));
//       })
//     );
//   }
//
//   // Bulk delete (DELETE nhiều ID)
//   bulkDelete(ids: number[]): Observable<void> {
//     return this.http.request<void>('DELETE', this.apiUrl, {
//       body: ids
//     }).pipe(
//       catchError(error => {
//         console.error('Bulk delete error:', error);
//         return throwError(() => new Error('Xóa hàng loạt thất bại'));
//       })
//     );
//   }
}
