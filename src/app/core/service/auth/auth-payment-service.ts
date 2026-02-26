import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '../api-client-service';
import {Observable, throwError} from 'rxjs';
import {Payment} from '../../interface/entity/payment';
import {catchError} from 'rxjs/operators';
import {ListData} from '../../interface/list-data';
import {HttpParams} from '@angular/common/http';
import {AuthPayment} from '../../interface/entity/auth/auth-payment';
import {AuthPaymentRequest} from '../../interface/request/auth/auth-payment-request';

@Injectable({
  providedIn: 'root'
})
export class AuthPaymentService{
  api = inject(ApiClientService)

  createPayment(paymentRequest: AuthPaymentRequest): Observable<AuthPayment> {
    return this.api.post<AuthPayment>('/auth/payments', paymentRequest).pipe(
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
    sort: string = 'id,asc'
  ): Observable<ListData<AuthPayment>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    if (search) {
      params = params.set('search', search);
    }

    return this.api.get<ListData<AuthPayment>>('/auth/payments', params);
  }

  getPayment(id: number): Observable<AuthPayment> {
    return this.api.get<AuthPayment>(`/auth/payments/${id}`).pipe(
      catchError(error => {
        console.error('Get payment error:', error);
        return throwError(() => new Error('Không thể lấy payment'));
      })
    );
  }

  update(updatedPayment: AuthPaymentRequest, id: number): Observable<AuthPayment> {
    return this.api.put<AuthPayment>(`/auth/payments/${id}`, updatedPayment).pipe(
      catchError(error => {
        console.error('Update payment error:', error);
        return throwError(() => new Error('Cập nhật payment thất bại'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/auth/payments`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  deletePayment(id: number) {
    return this.api.delete<void>(`/auth/payments/${id}`).pipe(
      catchError(error => {
        console.error('Delete payment error:', error);
        return throwError(() => new Error('Xóa payment thất bại'));
      })
    );
  }
}
