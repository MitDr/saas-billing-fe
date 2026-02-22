import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {Entitlement} from '../interface/entity/entitlement';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {EntitlementRequest} from '../interface/request/entitlement-request';
import {SoftDeleteRequest} from '../interface/request/soft-delete-request';

@Injectable({
  providedIn: 'root'
})
export class EntitlementService {
  api = inject(ApiClientService);

  createEntitlement(request: EntitlementRequest): Observable<Entitlement> {
    return this.api.post<Entitlement>(`/admin/entitlements`, request).pipe(
      catchError(error => {
        console.error('Create entitlement error:', error);
        return throwError(() => new Error('Tạo entitlement thất bại'));
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
  ): Observable<ListData<Entitlement>> {

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

    return this.api.get<ListData<Entitlement>>('/admin/entitlements', params);
  }

  getEntitlement(id: number): Observable<Entitlement> {
    return this.api.get<Entitlement>(`/admin/entitlements/${id}`).pipe(
      catchError(error => {
        console.error('Get entitlement error:', error);
        return throwError(() => new Error('Không thể lấy entitlement'));
      })
    );
  }

  update(updateEntitlement: EntitlementRequest, id: number): Observable<Entitlement> {
    return this.api.put<Entitlement>(`/admin/entitlements/${id}`, updateEntitlement).pipe(
      catchError(error => {
        console.error('Update entitlement error:', error);
        return throwError(() => new Error('Cập nhật entitlement thất bại'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/admin/entitlements`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  bulkSoftDelete(softDeleteRequest: SoftDeleteRequest): Observable<void> {
    return this.api.post<void>(`/admin/entitlements/softDelete`, softDeleteRequest).pipe(
      catchError(error => {
        console.error('Bulk soft delete error:', error);
        return throwError(() => new Error('Xóa mềm hàng loạt thất bại'));
      })
    );
  }

  deleteEntitlement(id: number): Observable<void> {
    return this.api.delete<void>(`/admin/entitlements/${id}`).pipe(
      catchError(error => {
        console.error('Delete entitlement error:', error);
        return throwError(() => new Error('Xóa entitlement thất bại'));
      })
    );
  }
}
