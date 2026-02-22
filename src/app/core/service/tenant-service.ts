import {inject, Injectable} from "@angular/core";
import {ApiClientService} from './api-client-service';
import {map, Observable, throwError} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {ListData} from '../interface/list-data';
import {Tenant} from '../interface/entity/tenant';
import {catchError} from 'rxjs/operators';
import {TenantRequest} from '../interface/request/tenant-request';
import {SoftDeleteRequest} from '../interface/request/soft-delete-request';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  api = inject(ApiClientService);

  createTenant(request: TenantRequest): Observable<Tenant> {
    return this.api.post<Tenant>(`/admin/tenants`, request).pipe(
      catchError(error => {
        console.error('Create tenant error:', error);
        return throwError(() => new Error('Tạo tenant thất bại'));
      })
    );
  }

  getTenants(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    sort: string = 'id,asc'
  ): Observable<ListData<Tenant>> {

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

    return this.api.get<ListData<Tenant>>('/admin/tenants', params);
  }

  getAllTenants(page: number = 0, size: number = 5): Observable<ListData<Tenant>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,asc')
      .set('all', 'true')

    return this.api.get<ListData<Tenant>>('/admin/tenants', params)
      .pipe(
        map(response => {
          return response as ListData<Tenant>;
        }),
        catchError(error => {
          console.error('Get tenants error', error);
          return throwError(() => new Error('Không thể lấy danh sách tenant'))
        })
      )
  }

  getTenant(id: number): Observable<Tenant> {
    return this.api.get<Tenant>(`/admin/tenants/${id}`).pipe(
      catchError(error => {
        console.error('Get tenant error:', error);
        return throwError(() => new Error('Không thể lấy tenant'));
      })
    );
  }

  updateTenant(updateTenant: TenantRequest, id: number): Observable<Tenant> {
    return this.api.put<Tenant>(`/admin/tenants/${id}`, updateTenant).pipe(
      catchError(error => {
        console.error('Update tenant error:', error);
        return throwError(() => new Error('Cập nhật tenant thất bại'));
      })
    );
  }

  deleteTenant(id: number): Observable<void> {
    return this.api.delete<void>(`/admin/tenants/${id}`).pipe(
      catchError(error => {
        console.error('delete tenant error:', error);
        return throwError(() => new Error('Xóa tenant thất bại'));
      })
    )
  }


  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/admin/tenants`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  bulkSoftDelete(softDeleteRequest: SoftDeleteRequest): Observable<void> {
    return this.api.post<void>(`/admin/tenants/softDelete`, softDeleteRequest).pipe(
      catchError(error => {
        console.error('Bulk soft delete error:', error);
        return throwError(() => new Error('Xóa mềm hàng loạt thất bại'));
      })
    );
  }

  refreshAPIKey(id: number): Observable<Tenant> {
    return this.api.post<Tenant>(`/admin/tenants/refresh-api-key/${id}`).pipe(
      catchError(error => {
        console.error('Refresh API key error:', error);
        return throwError(() => new Error('Refresh API key thất bại'));
      })
    );
  }
}
