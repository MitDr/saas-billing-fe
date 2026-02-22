import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {Invoice} from '../interface/entity/invoice';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {InvoiceRequest} from '../interface/request/invoice-request';
import {SoftDeleteRequest} from '../interface/request/soft-delete-request';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  api = inject(ApiClientService);

  createInvoice(request: InvoiceRequest): Observable<Invoice> {
    return this.api.post<Invoice>('/admin/invoices', request).pipe(
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
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<Invoice>> {

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

    return this.api.get<ListData<Invoice>>('/admin/invoices', params);
  }

  getAllInvoices(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<Invoice>> {

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

    return this.api.get<ListData<Invoice>>('/admin/invoices', params);
  }

  getInvoice(id: number): Observable<Invoice> {
    return this.api.get<Invoice>(`/admin/invoices/${id}`).pipe(
      catchError(error => {
        console.error('Get invoice error:', error);
        return throwError(() => new Error('Không thể lấy invoice'));
      })
    );
  }

  update(updatedInvoice: InvoiceRequest, id: number): Observable<Invoice> {
    console.log(updatedInvoice)
    return this.api.put<Invoice>(`/admin/invoices/${id}`, updatedInvoice).pipe(
      catchError(error => {
        console.error('Update invoice error:', error);
        return throwError(() => new Error('Cập nhật invoice thất bại'));
      })
    );
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/admin/invoices`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  bulkSoftDelete(softDeleteRequest: SoftDeleteRequest): Observable<void> {
    return this.api.post<void>(`/admin/invoices/softDelete`, softDeleteRequest).pipe(
      catchError(error => {
        console.error('Bulk soft delete error:', error);
        return throwError(() => new Error('Xóa mềm hàng loạt thất bại'));
      })
    );
  }

  deleteInvoice(id: number): Observable<void> {
    return this.api.delete<void>(`/admin/invoices/${id}`).pipe(
      catchError(error => {
        console.error('Delete invoice error:', error);
        return throwError(() => new Error('Xóa invoice thất bại'));
      })
    );
  }
}
