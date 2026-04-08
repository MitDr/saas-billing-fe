import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '../api-client-service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ListData} from '../../interface/list-data';
import {HttpParams} from '@angular/common/http';
import {SoftDeleteRequest} from '../../interface/request/soft-delete-request';
import {AuthEntitlementRequest} from '../../interface/request/auth/auth-entitlement-request';
import {AuthEntitlement} from '../../interface/entity/auth/auth-entitlement';
import {Policy} from '../../interface/entity/auth/policy';
import {AuthPolicy} from '../../interface/entity/auth/auth-policy';

@Injectable({
  providedIn: 'root'
})
export class AuthEntitlementService {
  api = inject(ApiClientService);

  createEntitlement(request: AuthEntitlementRequest): Observable<AuthEntitlement> {
    return this.api.post<AuthEntitlement>(`/auth/entitlements`, request).pipe(
      catchError(error => {
        console.error('Create entitlement error:', error);
        return throwError(() => new Error('Create entitlement failed'));
      })
    );
  }

  getEntitlements(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<AuthEntitlement>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    if (search) {
      params = params.set('search', search);
    }

    if (softDelete !== null && softDelete !== undefined) {
      params = params.set('softDelete', softDelete.toString());
    }

    if (tenantId) {
      params = params
        .set('tenantId', tenantId.toString())
        .set('filterByTenant', 'true');
    }

    return this.api.get<ListData<AuthEntitlement>>('/auth/entitlements', params);
  }

  getEntitlement(id: number): Observable<AuthEntitlement> {
    return this.api.get<AuthEntitlement>(`/auth/entitlements/${id}`).pipe(
      catchError(error => {
        console.error('Get entitlement error:', error);
        return throwError(() => new Error('Cannot get entitlement'));
      })
    );
  }

  update(updateEntitlement: AuthEntitlementRequest, id: number): Observable<AuthEntitlement> {
    return this.api.put<AuthEntitlement>(`/auth/entitlements/${id}`, updateEntitlement).pipe(
      catchError(error => {
        console.error('Update entitlement error:', error);
        return throwError(() => new Error('Update entitlement failed'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/auth/entitlements`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Bulk delete failed'));
      })
    );
  }

  bulkSoftDelete(softDeleteRequest: SoftDeleteRequest): Observable<void> {
    return this.api.post<void>(`/auth/entitlements/softDelete`, softDeleteRequest).pipe(
      catchError(error => {
        console.error('Bulk soft delete error:', error);
        return throwError(() => new Error('Bulk soft delete failed'));
      })
    );
  }

  deleteEntitlement(id: number): Observable<void> {
    return this.api.delete<void>(`/auth/entitlements/${id}`).pipe(
      catchError(error => {
        console.error('Delete entitlement error:', error);
        return throwError(() => new Error('Delete entitlement failed'));
      })
    );
  }

  checkPolicies(request: AuthPolicy): Observable<Policy> {
    return this.api.post<Policy>('/auth/entitlements/check-policies', request).pipe(
      catchError(error => {
        console.error('get policy error:', error);
        return throwError(() => new Error('get policy failed'));
      })
    );
  }
}
