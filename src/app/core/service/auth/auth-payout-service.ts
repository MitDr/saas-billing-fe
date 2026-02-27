import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '../api-client-service';
import {PayoutRequest} from '../../interface/request/payout-request';
import {Observable, throwError} from 'rxjs';
import {Payout} from '../../interface/entity/payout';
import {catchError} from 'rxjs/operators';
import {ListData} from '../../interface/list-data';
import {HttpParams} from '@angular/common/http';
import {AuthPayoutRequest} from '../../interface/request/auth/auth-payout-request';
import {AuthPayout} from '../../interface/entity/auth/auth-payout';

@Injectable({
  providedIn: 'root'
})
export class AuthPayoutService{
  api = inject(ApiClientService);

  createPayout(payload: AuthPayoutRequest): Observable<AuthPayout> {
    return this.api.post<AuthPayout>('/auth/payouts', payload).pipe(
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
  ): Observable<ListData<AuthPayout>> {

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

    return this.api.get<ListData<AuthPayout>>('/auth/payouts', params);
  }

  getAllPayouts(
    page: number = 1,
    size: number = 5,
    search?: string,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<AuthPayout>> {

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

    return this.api.get<ListData<AuthPayout>>('/auth/payouts', params);
  }

  getPayout(id: number): Observable<AuthPayout> {
    return this.api.get<AuthPayout>(`/auth/payouts/${id}`).pipe(
      catchError(error => {
        console.error('Get payout error:', error);
        return throwError(() => new Error('Không thể lấy payout'));
      })
    );
  }

  update(updatedPayout: AuthPayoutRequest, id: number): Observable<AuthPayout> {
    return this.api.put<Payout>(`/auth/payouts/${id}`, updatedPayout).pipe(
      catchError(error => {
        console.error('Update payout error:', error);
        return throwError(() => new Error('Cập nhật payout thất bại'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/auth/payouts`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  deletePayout(id: number): Observable<void> {
    return this.api.delete<void>(`/auth/payouts/${id}`).pipe(
      catchError(error => {
        console.error('Delete payout error:', error);
        return throwError(() => new Error('Xóa payout thất bại'));
      })
    );
  }
}
