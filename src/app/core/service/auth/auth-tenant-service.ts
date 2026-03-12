import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '../api-client-service';
import {Observable, throwError} from 'rxjs';
import {AuthTenant} from '../../interface/entity/auth/auth-tenant';
import {catchError} from 'rxjs/operators';
import {AuthTenantRequest} from '../../interface/request/auth/auth-tenant-request';
import {ChangeOwnerRequest} from '../../interface/request/auth/change-owner-request';

@Injectable({
  providedIn: 'root'
})
export class AuthTenantService {
  api = inject(ApiClientService);

  getTenant(): Observable<AuthTenant> {
    return this.api.get<AuthTenant>('/auth/tenants').pipe(
      catchError(error => {
        console.error('Get tenant error:', error);
        return throwError(() => new Error('Cannot get tenant'));
      })
    );
  }

  updateTenant(request: AuthTenantRequest, id: number): Observable<AuthTenant>{
    return this.api.put<AuthTenant>(`auth/tenants/${id}`, request).pipe(
      catchError(error => {
        console.error('Update tenant error:', error);
        return throwError(() => new Error('Cannot update tenant'));
      })
    )
  }

  changeOwner(request: ChangeOwnerRequest): Observable<AuthTenant>{
    return this.api.put<AuthTenant>('auth/tenants/change-owner', request).pipe(
      catchError(error => {
        console.error('Change owner error:', error);
        return throwError(() => new Error('Cannot change owner'));
      })
    )
  }

  createTenant(request: AuthTenantRequest): Observable<AuthTenant>{
    return this.api.post<AuthTenant>('/auth/tenants').pipe(
      catchError(error => {
        console.error('Create tenant error:', error);
        return throwError(() => new Error('Cannot create tenant'));
      })
    )
  }

  refreshAPIKey(): Observable<AuthTenant> {
    return this.api.post<AuthTenant>(`/auth/tenants/refresh-api-key`).pipe(
      catchError(error => {
        console.error('Refresh API key error:', error);
        return throwError(() => new Error('Refresh API key thất bại'));
      })
    );
  }

  leaveTenant(): Observable<string>{
    return this.api.post<string>(`/auth/tenants/leave`).pipe(
      catchError(error => {
        console.error('Leave tenant error:', error);
        return throwError(() => new Error('Cannot leave tenant'));
      })
    )
  }

  updateAccountLink(): Observable<string>{
    return this.api.post<string>(`/auth/tenants/update-account`).pipe(
      catchError(error => {
        console.error('Leave tenant error:', error);
        return throwError(() => new Error('Cannot leave tenant'));
      })
    )
  }

  deleteTenant(): Observable<void>{
    return this.api.delete<void>('auth/tenants').pipe(
      catchError(error => {
        console.error('Cannot delete tenant:', error);
        return throwError(() => new Error('Cannot delete tenant'));
      })
    )
  }

  removeUserFromTenant(request: ChangeOwnerRequest): Observable<AuthTenant>{
    return this.api.deletes<AuthTenant>('auth/tenants/remove-users', request).pipe(
      catchError(error => {
        console.error('Cannot remove user', error);
        return throwError(() => new Error('Cannot remove user'));
      })
    )
  }

}
