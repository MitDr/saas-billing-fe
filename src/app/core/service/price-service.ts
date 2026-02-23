import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {catchError} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {Price} from '../interface/entity/price';
import {PriceRequest} from '../interface/request/price-request';
import {SoftDeleteRequest} from '../interface/request/soft-delete-request';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  api = inject(ApiClientService);

  createPrice(request: PriceRequest): Observable<Price> {
    return this.api.post<Price>('/admin/prices', request).pipe(
      catchError(error => {
        console.error('Create price error:', error);
        return throwError(() => new Error('Tạo price thất bại'));
      })
    );
  }

  // getPrices(page: number = 1, size: number = 5): Observable<ListData<Price>> {
  //   let params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('size', size.toString())
  //     .set('sort', 'id,asc')
  //     .set('all', 'false')
  //   // .set()
  //
  //   return this.api.get<ListData<Price>>("/admin/prices", params)
  //     .pipe(
  //       map(response => {
  //         return response as ListData<Price>;
  //       }),
  //       catchError(error => {
  //         console.error('Get prices error:', error);
  //         return throwError(() => new Error('Không thể lấy danh sách prices'));
  //       })
  //     )
  // }
  //
  update(updatedPrice: PriceRequest, id: number): Observable<Price> {
    console.log(updatedPrice)
    return this.api.put<Price>(`/admin/prices/${id}`, updatedPrice).pipe(
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
  ): Observable<ListData<Price>> {

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

    return this.api.get<ListData<Price>>('/admin/prices', params);
  }

  getAllPrices(
    page: number = 1,
    size: number = 5,
    search?: string,
    softDelete?: boolean | null,
    tenantId?: number | null,
    sort: string = 'id,asc'
  ): Observable<ListData<Price>> {

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

    return this.api.get<ListData<Price>>('/admin/prices', params);
  }

  getPrice(id: number): Observable<Price> {
    return this.api.get<Price>(`/admin/prices/${id}`).pipe(
      catchError(error => {
        console.error('Get price error:', error);
        return throwError(() => new Error('Không thể lấy price'));
      })
    );
  }


  bulkDelete(ids: number[]): Observable<void> {
    return this.api.deletes<void>(`/admin/prices`, ids).pipe(
      catchError(error => {
        console.error('Bulk delete error:', error);
        return throwError(() => new Error('Xóa hàng loạt thất bại'));
      })
    );
  }

  bulkSoftDelete(softDeleteRequest: SoftDeleteRequest): Observable<void> {
    return this.api.post<void>(`/admin/prices/softDelete`, softDeleteRequest).pipe(
      catchError(error => {
        console.error('Bulk soft delete error:', error);
        return throwError(() => new Error('Xóa mềm hàng loạt thất bại'));
      })
    );
  }

  deletePrice(id: number): Observable<void> {
    return this.api.delete<void>(`/admin/prices/${id}`).pipe(
      catchError(error => {
        console.error('Delete price error:', error);
        return throwError(() => new Error('Xóa price thất bại'));
      })
    );
  }
}
