import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '../api-client-service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ListData} from '../../interface/list-data';
import {HttpParams} from '@angular/common/http';
import {AuthInvoiceRequest} from '../../interface/request/auth/auth-invoice-request';
import {AuthInvoice} from '../../interface/entity/auth/auth-invoice';

@Injectable({
  providedIn: 'root'
})
export class AuthInvoiceService {
  api = inject(ApiClientService);

  createInvoice(request: AuthInvoiceRequest): Observable<AuthInvoice> {
    return this.api.post<AuthInvoice>('/auth/invoices', request).pipe(
      catchError(error => {
        console.error('Create invoice error:', error);
        return throwError(() => new Error('Tạo invoice thất bại'));
      })
    );
  }

  getInvoices(
    page: number = 1,
    size: number = 5,
    search?: string,
    sort: string = 'id,asc'
  ): Observable<ListData<AuthInvoice>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    if (search) {
      params = params.set('search', search);
    }

    return this.api.get<ListData<AuthInvoice>>('/auth/invoices', params);
  }

  getAllInvoices(
    page: number = 1,
    size: number = 5,
    search?: string,
    sort: string = 'id,asc'
  ): Observable<ListData<AuthInvoice>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort)
      .set('all', true);

    if (search) {
      params = params.set('search', search);
    }

    return this.api.get<ListData<AuthInvoice>>('/auth/invoices', params);
  }

  getInvoice(id: number): Observable<AuthInvoice> {
    return this.api.get<AuthInvoice>(`/auth/invoices/${id}`).pipe(
      catchError(error => {
        console.error('Get invoice error:', error);
        return throwError(() => new Error('Không thể lấy invoice'));
      })
    );
  }

  update(updatedInvoice: AuthInvoiceRequest, id: number): Observable<AuthInvoice> {
    console.log(updatedInvoice)
    return this.api.put<AuthInvoice>(`/auth/invoices/${id}`, updatedInvoice).pipe(
      catchError(error => {
        console.error('Update invoice error:', error);
        return throwError(() => new Error('Cập nhật invoice thất bại'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/auth/invoices`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  deleteInvoice(id: number): Observable<void> {
    return this.api.delete<void>(`/auth/invoices/${id}`).pipe(
      catchError(error => {
        console.error('Delete invoice error:', error);
        return throwError(() => new Error('Xóa invoice thất bại'));
      })
    );
  }
}
