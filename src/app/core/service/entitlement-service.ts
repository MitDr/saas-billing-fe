import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {map, Observable, throwError} from 'rxjs';
import {ListData} from '../interface/list-data';
import {Entitlement} from '../interface/entity/entitlement';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntitlementService{
  api = inject(ApiClientService);

  getEntitlements(page: number = 1, size: number = 5): Observable<ListData<Entitlement>>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,asc')
      .set('all', 'false')
    // .set()

    return this.api.get<ListData<Entitlement>>("/admin/entitlements", params)
      .pipe(
        map(response => {
          return response as ListData<Entitlement>;
        }),
        catchError(error => {
          console.error('Get entitlements error:', error);
          return throwError(() => new Error('Không thể lấy danh sách entitlements'));
        })
      )
  }
}
