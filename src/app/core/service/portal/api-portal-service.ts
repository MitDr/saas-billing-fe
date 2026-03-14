import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {computed, inject, Injectable, signal} from '@angular/core';
import { NzMessageService } from "ng-zorro-antd/message";
import {Router} from '@angular/router';
import {BehaviorSubject, map, Observable, throwError} from "rxjs";
import {catchError, tap} from 'rxjs/operators';
import {ListData} from '../../interface/list-data';
import {PortalSubscription} from '../../interface/portal/portal-subscription';
import {ApiResponse} from '../../model/api-model';

export interface PortalUser {
  subscriberId: string;
  tenantId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiPortalService {
  private baseUrl = 'http://localhost:8080/api/v1';
  private http: HttpClient;

  constructor(
    http: HttpClient,
    private message: NzMessageService,
    private router: Router
  ) {
    this.http = http;
  }

  request<T>(
    method: string,
    endpoint: string,
    body?: any,
    params?: any
  ): Observable<T> {

    return this.http.request<ApiResponse<T> | null>(
      method,
      `${this.baseUrl}${endpoint}`,
      {
        body,
        params,
        observe: 'response',
        withCredentials: true
      }
    ).pipe(
      map((res: HttpResponse<ApiResponse<T> | null>) => {

        if (res.status === 204) {
          return undefined as T;
        }

        const body = res.body;

        if (body?.message && res.status !== 200) {
          this.message.success(body.message);
        }

        return body?.data as T;
      }),

      catchError(err => {

        this.message.error(err.error?.message || 'Có lỗi xảy ra');

        return throwError(() => err);
      })
    );
  }

  get<T>(url: string, params?: any) {
    return this.request<T>('GET', url, null, params);
  }

  post<T>(url: string, body?: any) {
    return this.request<T>('POST', url, body);
  }
}
