import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {map, Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {Invoice} from '../interface/entity/invoice';
import {HttpParams} from '@angular/common/http';
import {Feature} from '../interface/entity/feature';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService{
  api = inject(ApiClientService);

  getInvoices(page: number = 1, size: number = 5): Observable<ListData<Invoice>>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,asc')
      .set('all', 'false')
    // .set()

    return this.api.get<ListData<Invoice>>("/admin/invoices", params)
      .pipe(
        map(response => {
          return response as ListData<Invoice>;
        }),
        catchError(error => {
          console.error('Get invoices error:', error);
          return throwError(() => new Error('Không thể lấy danh sách invoices'));
        })
      )


  }
}
