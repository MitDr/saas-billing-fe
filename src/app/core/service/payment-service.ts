import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {map, Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {Payment} from '../interface/entity/payment';
import {HttpParams} from '@angular/common/http';
import {Feature} from '../interface/entity/feature';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService{
  api = inject(ApiClientService)

  getPayments(page: number= 1, size: number = 5): Observable<ListData<Payment>>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,asc')
      .set('all', 'false')
    // .set()

    return this.api.get<ListData<Payment>>("/admin/payments", params)
      .pipe(
        map(response => {
          return response as ListData<Payment>;
        }),
        catchError(error => {
          console.error('Get payments error:', error);
          return throwError(() => new Error('Không thể lấy danh sách payments'));
        })
      )
  }
}
