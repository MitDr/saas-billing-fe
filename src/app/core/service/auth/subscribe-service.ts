import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '../api-client-service';
import {SubscribeRequest} from '../../interface/request/auth/subscribe-request';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {CancelRequest} from '../../interface/request/auth/cancel-request';
import {RenewRequest} from '../../interface/request/auth/renew-request';
import {ReactivateRequest} from '../../interface/request/auth/reactivate-request';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  api = inject(ApiClientService);

  subscribe(request: SubscribeRequest): Observable<string> {
    return this.api.post<string>('/auth/subscribe', request).pipe(
      catchError(error => {
        console.error('Subscribe failed:', error);
        return throwError(() => new Error('Subscribe failed'));
      })
    )
  }

  cancel(request: CancelRequest): Observable<string> {
    return this.api.post<string>('/auth/subscribe/cancel', request).pipe(
      catchError(error => {
        console.error('Cancel failed:', error);
        return throwError(() => new Error('Cancel failed'));
      })
    )
  }

  renew(request: RenewRequest): Observable<string> {
    return this.api.post<string>('/auth/subscribe/renew', request).pipe(
      catchError(error => {
        console.error('Cancel failed:', error);
        return throwError(() => new Error('Cancel failed'));
      })
    )
  }

  reactivate(request: ReactivateRequest): Observable<string> {
    return this.api.post<string>('/auth/subscribe/reactivate', request).pipe(
      catchError(error => {
        console.error('Reactivate failed:', error);
        return throwError(() => new Error('Reactivate failed'));
      })
    )
  }


}
