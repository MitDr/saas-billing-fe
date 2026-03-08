import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '../api-client-service';
import {Observable, throwError} from 'rxjs';
import {AuthTenant} from '../../interface/entity/auth/auth-tenant';
import {catchError} from 'rxjs/operators';

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

  refreshAPIKey(): Observable<AuthTenant> {
    return this.api.post<AuthTenant>(`/auth/tenants/refresh-api-key`).pipe(
      catchError(error => {
        console.error('Refresh API key error:', error);
        return throwError(() => new Error('Refresh API key thất bại'));
      })
    );
  }


}
