import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '../api-client-service';
import {PriceRequest} from '../../interface/request/price-request';
import {Observable, throwError} from 'rxjs';
import {Price} from '../../interface/entity/price';
import {catchError} from 'rxjs/operators';
import {ListData} from '../../interface/list-data';
import {HttpParams} from '@angular/common/http';
import {SoftDeleteRequest} from '../../interface/request/soft-delete-request';
import {AuthPriceRequest} from '../../interface/request/auth/auth-price-request';
import {AuthPrice} from '../../interface/entity/auth/auth-price';

@Injectable({
  providedIn: 'root'
})
export class AuthPriceService{
  api = inject(ApiClientService);

  createPrice(request: AuthPriceRequest): Observable<AuthPrice> {
    return this.api.post<AuthPrice>('/auth/prices', request).pipe(
      catchError(error => {
        console.error('Create price error:', error);
        return throwError(() => new Error('Tạo price thất bại'));
      })
    );
  }

  update(updatedPrice: AuthPriceRequest, id: number): Observable<AuthPrice> {
    console.log(updatedPrice)
    return this.api.put<Price>(`/auth/prices/${id}`, updatedPrice).pipe(
      catchError(error => {
        console.error('Update price error:', error);
        return throwError(() => new Error('Cập nhật price thất bại'));
      })
    );
  }

  getPrices(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<AuthPrice>> {

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

    return this.api.get<ListData<AuthPrice>>('/auth/prices', params);
  }

  getAllPrices(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<AuthPrice>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort)
      .set('all', true);

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

    return this.api.get<ListData<AuthPrice>>('/auth/prices', params);
  }

  getPrice(id: number): Observable<AuthPrice> {
    return this.api.get<AuthPrice>(`/auth/prices/${id}`).pipe(
      catchError(error => {
        console.error('Get price error:', error);
        return throwError(() => new Error('Không thể lấy price'));
      })
    );
  }


  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/auth/prices`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  bulkSoftDelete(softDeleteRequest: SoftDeleteRequest): Observable<void> {
    return this.api.post<void>(`/auth/prices/softDelete`, softDeleteRequest).pipe(
      catchError(error => {
        console.error('Bulk soft delete error:', error);
        return throwError(() => new Error('Xóa mềm hàng loạt thất bại'));
      })
    );
  }

  deletePrice(id: number): Observable<void> {
    return this.api.delete<void>(`/auth/prices/${id}`).pipe(
      catchError(error => {
        console.error('Delete price error:', error);
        return throwError(() => new Error('Xóa price thất bại'));
      })
    );
  }
}
