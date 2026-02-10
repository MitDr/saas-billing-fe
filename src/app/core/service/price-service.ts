import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {map, Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {catchError} from 'rxjs/operators';
import {Feature} from '../interface/entity/feature';
import {HttpParams} from '@angular/common/http';
import {Price} from '../interface/entity/price';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  api = inject(ApiClientService);

  getPrices(page: number = 1, size: number = 5): Observable<ListData<Price>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,asc')
      .set('all', 'false')
    // .set()

    return this.api.get<ListData<Price>>("/admin/prices", params)
      .pipe(
        map(response => {
          return response as ListData<Price>;
        }),
        catchError(error => {
          console.error('Get prices error:', error);
          return throwError(() => new Error('Không thể lấy danh sách prices'));
        })
      )

    // return this.http.get<any>(this.apiUrl, {headers, params}).pipe(
    //   map(response => {
    //     // API của bạn trả { data: { content: ..., page: ..., ... } }
    //     return response.content as ListData<User>;
    //   }),
    //   catchError(error => {
    //     console.error('Get users error:', error);
    //     return throwError(() => new Error('Không thể lấy danh sách user'));
    //   })
    // );
  }


}
