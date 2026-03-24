import {inject, Injectable} from '@angular/core';
import {ApiClientService} from './api-client-service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthQueryRequest} from '../interface/request/auth/auth-query-request';
import {AuthQueryResponse} from '../interface/response/statistic/auth-query-response';
import {FileItem} from '../../pages/admin/ai-doc/ai-doc/ai-doc';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  api = inject(ApiClientService);

  query(request: AuthQueryRequest): Observable<AuthQueryResponse> {
    return this.api.post<AuthQueryResponse>(`/auth/chat-bot/query`, request).pipe(
      catchError(error => {
        console.error('Query error:', error);
        return throwError(() => new Error('Cannot Query'));
      })
    );
  }

  uploadFile(request: FormData): Observable<string> {
    return this.api.post<string>('/admin/chat-bot/upload', request).pipe(
      catchError(error => {
        console.error('upload error:', error);
        return throwError(() => new Error('upload Query'));
      })
    )
  }

  getFiles(): Observable<FileItem[]> {
    return this.api.get<FileItem[]>(`/admin/chat-bot/files`).pipe(
      catchError(error => {
        console.error('get files error:', error);
        return throwError(() => new Error('Cannot get files'));
      })
    );
  }

  deleteFiles(id: string): Observable<string> {
    return this.api.delete<string>(`/admin/chat-bot/files/${id}`).pipe(
      catchError(error => {
        console.error('delete files error:', error);
        return throwError(() => new Error('Cannot delete files'));
      })
    )
  }
}
