import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {Payment} from '../interface/entity/payment';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {PaymentRequest} from '../interface/request/payment-request';
import {SoftDeleteRequest} from '../interface/request/soft-delete-request';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  api = inject(ApiClientService)

  createPayment(paymentRequest: PaymentRequest): Observable<Payment> {
    return this.api.post<Payment>('/admin/payments', paymentRequest).pipe(
      catchError(error => {
        console.error('Create payment error:', error);
        return throwError(() => new Error('Tạo payment thất bại'));
      })
    );
  }

  getPayments(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<Payment>> {

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

    return this.api.get<ListData<Payment>>('/admin/payments', params);
  }

  getPayment(id: number): Observable<Payment> {
    return this.api.get<Payment>(`/admin/payments/${id}`).pipe(
      catchError(error => {
        console.error('Get payment error:', error);
        return throwError(() => new Error('Không thể lấy payment'));
      })
    );
  }

  update(updatedPayment: PaymentRequest, id: number): Observable<Payment> {
    return this.api.put<Payment>(`/admin/payments/${id}`, updatedPayment).pipe(
      catchError(error => {
        console.error('Update payment error:', error);
        return throwError(() => new Error('Cập nhật payment thất bại'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/admin/payments`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  bulkSoftDelete(softDeleteRequest: SoftDeleteRequest): Observable<void> {
    return this.api.post<void>(`/admin/payments/softDelete`, softDeleteRequest).pipe(
      catchError(error => {
        console.error('Bulk soft delete error:', error);
        return throwError(() => new Error('Xóa mềm hàng loạt thất bại'));
      })
    );
  }

  deletePayment(id: number) {
    return this.api.delete<void>(`/admin/payments/${id}`).pipe(
      catchError(error => {
        console.error('Delete payment error:', error);
        return throwError(() => new Error('Xóa payment thất bại'));
      })
    );
  }
}
