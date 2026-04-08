import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {RevenueSummary} from '../interface/response/statistic/revenue-summary';
import {SubscriptionSummary} from '../interface/response/statistic/subscription-overview';
import {MrrResponse} from '../interface/response/statistic/mmr-response';
import {HttpParams} from '@angular/common/http';
import {SuccessRateResponse} from '../interface/response/statistic/success-rate-response';
import {ChurnRateResponse} from '../interface/response/statistic/churn-rate-response';
import {ExpectedRenewal} from '../interface/response/statistic/expected-renewal';

@Injectable({
  providedIn: 'root'
})
export class AuthStatisticService {
  api = inject(ApiClientService)

  getRevenueSummary(): Observable<RevenueSummary> {
    return this.api.get<RevenueSummary>('/auth/analytics/tenant/revenue/summary').pipe(
      catchError(error => {
        console.error('Get revenue summary error:', error);
        return throwError(() => new Error('Cannot get thông tin thống kê doanh thu'));
      })
    )
  }

  getSubscriptionSummary(): Observable<SubscriptionSummary> {
    return this.api.get<SubscriptionSummary>('/auth/analytics/tenant/subscription/summary').pipe(
      catchError(error => {
        console.error('Get subscription summary error:', error);
        return throwError(() => new Error('Cannot get thông tin thống kê doanh thu'));
      })
    )
  }

  getMrrRevenues(month: number = 12): Observable<MrrResponse[]> {
    let params = new HttpParams()
      .set('month', month);

    return this.api.get<MrrResponse[]>(`/auth/analytics/tenant/invoice/mmr/${month}`).pipe(
      catchError(error => {
        console.error('Get mrr revenues error:', error);
        return throwError(() => new Error('Cannot get thông tin thống kê doanh thu'));
      })
    )
  }

  getSuccessRate(): Observable<SuccessRateResponse> {
    return this.api.get<SuccessRateResponse>('/auth/analytics/tenant/invoice/success-rate').pipe(
      catchError(error => {
        console.error('Get success rate error:', error);
        return throwError(() => new Error('Cannot get thông tin thống kê doanh thu'));
      })
    )
  }

  getChurnRate(num: number = 12): Observable<ChurnRateResponse> {
    let params = new HttpParams()
      .set('months', num);

    return this.api.get<ChurnRateResponse>('/auth/analytics/tenant/subscriptions/churn-rate', params).pipe(
      catchError(error => {
        console.error('Get churn rate error:', error);
        return throwError(() => new Error('Cannot get thông tin thống kê doanh thu'));
      })
    )
  }

  getUpcomingRenewal(days: number): Observable<ExpectedRenewal[]> {
    let params = new HttpParams()
      .set('days', days);

    return this.api.get<ExpectedRenewal[]>('/auth/analytics/tenant/subscriptions/upcoming-renewals', params).pipe(
      catchError(error => {
        console.error('Get upcoming renewal error:', error);
        return throwError(() => new Error('Cannot get thông tin thống kê doanh thu'));
      })
    )
  }
}
