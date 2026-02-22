import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {Observable, throwError} from 'rxjs';
import {SystemSummary} from '../interface/response/statistic/system-summary';
import {catchError} from 'rxjs/operators';
import {RevenueSummary} from '../interface/response/statistic/revenue-summary';
import {SubscriptionSummary} from '../interface/response/statistic/subscription-overview';

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
}
