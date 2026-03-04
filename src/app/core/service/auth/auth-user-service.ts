import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '../api-client-service';
import {Observable, throwError} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {AuthUserRequest} from '../../interface/request/auth/auth-user-request';
import {AuthUser} from '../../interface/entity/auth/auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService{
  api = inject(ApiClientService);

  getUser(username: string, id: string, email: string): Observable<AuthUser>{
    let params = new HttpParams()
      .set('username', username)
      .set('id', id)
      .set('email', email)

    return this.api.get<AuthUser>('auth/users', params).pipe(
      catchError(error => {
        console.error('Get User Error');
        return throwError(() => new Error('Get User failed'));
      })
    );
  }

  updatePassword(request: AuthUserRequest): Observable<AuthUser>{
    return this.api.post<AuthUser>('auth/users', request).pipe(
      catchError(error => {
        console.error('Post User Error');
        return throwError(() => new Error('Post User failed'));
      })
    )
  }
}
