import {BehaviorSubject, filter, map, Observable, switchMap, take, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ApiResponse, AuthUser, LoginResponse} from '../model/api-model';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  // private baseUrl =
  private baseUrl = 'http://localhost:8080/api/v1';
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);
  private http: HttpClient;
  private bootstrapped = false;

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

    let headers = new HttpHeaders();
    const token = this.getAccessToken();

    if (token && !endpoint.startsWith('/public')) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // headers = headers.set('ngrok-skip-browser-warning', 'true');

    return this.http.request<ApiResponse<T> | null>(
      method,
      `${this.baseUrl}${endpoint}`,
      {
        body,
        params,
        headers,
        observe: 'response'
      }
    ).pipe(
      map((res: HttpResponse<ApiResponse<T> | null>) => {

        if (res.status === 204) {
          return undefined as T;
        }

        const body = res.body;

        // 👉 Message từ backend
        if (body?.message && res.status !== 200) {
          this.message.success(body.message);
        }

        return body?.data as T;
      }),

      catchError(err => {

        if (err.status === 401 && !endpoint.includes('/auth/refresh')) {
          return this.handle401Error<T>(method, endpoint, body, params);
        }

        this.message.error(err.error?.message || 'Có lỗi xảy ra');

        return throwError(() => err);
      })
    );
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  get<T>(url: string, params?: any) {
    return this.request<T>('GET', url, null, params);
  }

  post<T>(url: string, body?: any) {
    return this.request<T>('POST', url, body);
  }

  put<T>(url: string, body: any) {
    return this.request<T>('PUT', url, body);
  }

  delete<T>(url: string) {
    return this.request<T>('DELETE', url);
  }

  deletes<T>(url: string, body: any) {
    return this.request<T>('DELETE', url, body);
  }

  getCurrentUser(): AuthUser | null {
    const u = localStorage.getItem('currentUser');
    return u ? JSON.parse(u) : null;
  }

  bootstrapAuth() {
    if (this.bootstrapped) return;

    const access = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    const user = localStorage.getItem('currentUser');

    if (access && refresh && user) {
      this.bootstrapped = true;
    }
  }

  private getAccessToken() {
    const token = localStorage.getItem('accessToken');
    return token;
  }

  private getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  private setTokens(access: string, refresh: string) {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  }

  private handle401Error<T>(
    method: string,
    endpoint: string,
    body?: any,
    params?: any
  ) {
    if (this.getRefreshToken() === null) {
      this.logout();
      return throwError(() => 'Refresh token expired');
    }
    if (endpoint.includes('/public/auth/refresh')) {
      this.logout();
      return throwError(() => 'Refresh token expired');
    }

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.refreshToken().pipe(
        switchMap(newToken => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(newToken);

          // 👉 Gọi lại request cũ với token mới
          return this.request<T>(method, endpoint, body, params);
        }),

        catchError(err => {
          this.isRefreshing = false;
          this.logout();
          return throwError(() => err);
        })
      );
    }

    // Các request khác chờ token mới
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(() =>
        this.request<T>(method, endpoint, body, params)
      )
    );
  }

  private refreshToken(): Observable<string> {

    const refreshToken = this.getRefreshToken();
    const currentUser = this.getCurrentUser();

    if (!refreshToken || !currentUser) {
      this.logout();
      return throwError(() => 'No refresh token or user');
    }

    const body = {
      username: currentUser.username,
      role: currentUser.role,
      deviceId: localStorage.getItem('deviceId'),
      refreshToken: refreshToken
    };

    return this.http.post<ApiResponse<LoginResponse>>(
      `${this.baseUrl}/public/auth/refresh`,
      body
    ).pipe(
      map(res => {
        // Lưu token mới
        this.setTokens(
          res.data.accessToken,
          res.data.refreshToken
        );

        return res.data.accessToken;
      })
    );
  }
}
