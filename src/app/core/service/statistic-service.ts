import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {Observable, throwError} from 'rxjs';
import {SystemSummary} from '../interface/response/statistic/system-summary';
import {catchError} from 'rxjs/operators';
import {RevenueSummary} from '../interface/response/statistic/revenue-summary';
import {SubscriptionSummary} from '../interface/response/statistic/subscription-overview';
import {MrrResponse} from '../interface/response/statistic/mmr-response';
import {HttpParams} from '@angular/common/http';
import {TopTenantResponse} from '../interface/response/statistic/top-tenant-response';
import {ChurnRateResponse} from '../interface/response/statistic/churn-rate-response';
import {SuccessRateResponse} from '../interface/response/statistic/success-rate-response';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  api = inject(ApiClientService)

  getSystemSummary(): Observable<SystemSummary> {
    return this.api.get<SystemSummary>('/admin/analytics/tenant/system/summary').pipe(
      catchError(error => {
        console.error('Get system summary error:', error);
        return throwError(() => new Error('Không thể lấy thông tin thống kê hệ thống'));
      })
    )
  }

  getRevenueSummary(): Observable<RevenueSummary> {
    return this.api.get<RevenueSummary>('/admin/analytics/tenant/revenue/summary').pipe(
      catchError(error => {
        console.error('Get revenue summary error:', error);
        return throwError(() => new Error('Không thể lấy thông tin thống kê doanh thu'));
      })
    )
  }

  getSubscriptionSummary(): Observable<SubscriptionSummary> {
    return this.api.get<SubscriptionSummary>('/admin/analytics/tenant/subscription/summary').pipe(
      catchError(error => {
        console.error('Get subscription summary error:', error);
        return throwError(() => new Error('Không thể lấy thông tin thống kê doanh thu'));
      })
    )
  }

  getMrrRevenues(month: number = 12): Observable<MrrResponse[]> {
    let params = new HttpParams()
      .set('month', month);

    return this.api.get<MrrResponse[]>(`/admin/analytics/tenant/invoice/mmr/${month}`).pipe(
      catchError(error => {
        console.error('Get mrr revenues error:', error);
        return throwError(() => new Error('Không thể lấy thông tin thống kê doanh thu'));
      })
    )
  }

  getTopTenant(limit: number = 10): Observable<TopTenantResponse[]> {
    let params = new HttpParams()
      .set('limit', limit);

    return this.api.get<TopTenantResponse[]>(`/admin/analytics/tenant/top-revenue`, {params}).pipe(
      catchError(error => {
        console.error('Get top tenants error:', error);
        return throwError(() => new Error('Không thể lấy thông tin thống kê doanh thu'));
      })
    )
  }

  getSuccessRate(): Observable<SuccessRateResponse> {
    return this.api.get<SuccessRateResponse>('/admin/analytics/tenant/invoice/success-rate').pipe(
      catchError(error => {
        console.error('Get success rate error:', error);
        return throwError(() => new Error('Không thể lấy thông tin thống kê doanh thu'));
      })
    )
  }

  getChurnRate(num: number = 12): Observable<ChurnRateResponse> {
    let params = new HttpParams()
      .set('months', num);

    return this.api.get<ChurnRateResponse>('/admin/analytics/tenant/subscriptions/churn-rate', params).pipe(
      catchError(error => {
        console.error('Get churn rate error:', error);
        return throwError(() => new Error('Không thể lấy thông tin thống kê doanh thu'));
      })
    )
  }

  
}
