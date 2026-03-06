import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '../api-client-service';
import {SubscribeRequest} from '../../interface/request/auth/subscribe-request';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService{
  api = inject(ApiClientService);

  subscribe(request: SubscribeRequest):Observable<string>{
    return this.api.post<string>('/auth/subscribe', request).pipe(
      catchError(error => {
        console.error('Subscribe failed:', error);
        return throwError(() => new Error('Subscribe failed'));
      })
    )
  }
}
