import {inject, Injectable} from "@angular/core";
import {ApiClientService} from './api-client-service';
import {map, Observable, throwError} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {ListData} from '../interface/list-data';
import {Tenant} from '../interface/entity/tenant';
import {catchError} from 'rxjs/operators';
import {ApiResponse} from '../model/api-model';
import {response} from 'express';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  api = inject(ApiClientService);

  getTenants(page: number = 0, size: number = 5): Observable<ListData<Tenant>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,asc')
      .set('all', 'false')

    return this.api.get<ListData<Tenant>>('/admin/tenants', params)
      .pipe(
        map(response => {
          return response as ListData<Tenant>;
        }),
        catchError(error => {
          console.error('Get tenants error', error);
          return throwError(()=> new Error('Không thể lấy danh sách tenant'))
        })
      )
  }

  getTenant(id: number): Observable<ApiResponse<Tenant>>{
    return this.api.get<ApiResponse<Tenant>>('/admin/tenants/${id}')
      .pipe(
        map(response => {
          return response as ApiResponse<Tenant>;
        }),
        catchError(error => {
          console.error('Get tenant error', error);
          return throwError(()=> new Error('Không thể lấy danh sách tenant'))
        })
      )
  }
}
