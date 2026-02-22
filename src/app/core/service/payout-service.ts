import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Payout} from '../interface/entity/payout';
import {PayoutRequest} from '../interface/request/payout-request';

@Injectable({
  providedIn: 'root'
})
export class PayoutService {
  api = inject(ApiClientService);

  createPayout(payload: PayoutRequest): Observable<Payout> {
    return this.api.post<Payout>('/admin/payouts', payload).pipe(
      catchError(error => {
        console.error('Create payout error:', error);
        return throwError(() => new Error('Không thể tạo payout'));
      })
    );
  }

  getPayouts(
    page: number = 1,
    size: number = 5,
    search?: string,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<Payout>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    if (search) {
      params = params.set('search', search);
    }

    if (tenantId) {
      params = params
        .set('tenantId', tenantId.toString())
        .set('filterByTenant', 'true');
    }

    return this.api.get<ListData<Payout>>('/admin/payouts', params);
  }

  getAllPayouts(
    page: number = 1,
    size: number = 5,
    search?: string,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<Payout>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort)
      .set('all', true);

    if (search) {
      params = params.set('search', search);
    }

    if (tenantId) {
      params = params
        .set('tenantId', tenantId.toString())
        .set('filterByTenant', 'true');
    }

    return this.api.get<ListData<Payout>>('/admin/payouts', params);
  }

  getPayout(id: number): Observable<Payout> {
    return this.api.get<Payout>(`/admin/payouts/${id}`).pipe(
      catchError(error => {
        console.error('Get payout error:', error);
        return throwError(() => new Error('Không thể lấy payout'));
      })
    );
  }

  update(updatedPayout: PayoutRequest, id: number): Observable<Payout> {
    return this.api.put<Payout>(`/admin/payouts/${id}`, updatedPayout).pipe(
      catchError(error => {
        console.error('Update payout error:', error);
        return throwError(() => new Error('Cập nhật payout thất bại'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/admin/payouts`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  deletePayout(id: number): Observable<void> {
    return this.api.delete<void>(`/admin/payouts/${id}`).pipe(
      catchError(error => {
        console.error('Delete payout error:', error);
        return throwError(() => new Error('Xóa payout thất bại'));
      })
    );
  }
}
