import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {map, Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {Feature} from '../interface/entity/feature';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Payout} from '../interface/entity/payout';

@Injectable({
 providedIn: 'root'
})
export class PayoutService{
  api = inject(ApiClientService);

  getPayouts(page: number = 1, size: number = 5): Observable<ListData<Payout>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,asc')
      .set('all', 'false')
    // .set()

    return this.api.get<ListData<Payout>>("/admin/payouts", params)
      .pipe(
        map(response => {
          return response as ListData<Payout>;
        }),
        catchError(error => {
          console.error('Get payouts error:', error);
          return throwError(() => new Error('Không thể lấy danh sách payouts'));
        })
      )
  }
}
