import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthUser, LoginRequest, LoginResponse, LogoutRequest} from '../model/api-model';
import {ApiClientService} from './api-client-service';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  bootstrapped = false;
  currentUser$ = new BehaviorSubject<AuthUser | null>(this.loadUser());

  constructor(
    private api: ApiClientService,
    private router: Router
  ) {
  }

  get currentUser() {
    return this.currentUser$.value;
  }

  bootstrapAuth() {
    if (this.bootstrapped) return;

    console.log('[AUTH] bootstrapAuth called');
    const access = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    const user = localStorage.getItem('currentUser');

    console.log('[AUTH] bootstrap - accessToken:', access);
    console.log('[AUTH] bootstrap - refreshToken:', refresh);
    console.log('[AUTH] bootstrap - currentUser:', user);

    if (access && refresh && user) {
      this.bootstrapped = true;
      console.log('[AUTH] bootstrap success');
    } else {
      console.log('[AUTH] bootstrap failed - missing token/user');
    }
  }

  login(req: LoginRequest) {

    return this.api
      .post<LoginResponse>(
        '/public/auth/login',
        req
      )
      .pipe(
        tap(res => {

          // Lưu token
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);

          // Lưu user
          const user: AuthUser = {
            id: res.id,
            username: res.username,
            email: res.email,
            role: res.role
          };

          localStorage.setItem(
            'currentUser',
            JSON.stringify(user)
          );

          this.currentUser$.next(user);
        })
      );
  }

  isLoggedIn() {
    return !!localStorage.getItem('accessToken');
  }

  isAdmin() {
    return this.currentUser?.role === 'ADMIN';
  }

  logout(): Observable<void> {
    const req: LogoutRequest = {
      username: <string>this.currentUser?.username,
      deviceId: <string>localStorage.getItem('deviceId'),
      role: <'USER' | 'ADMIN'>this.currentUser?.role,
      refreshToken: <string>localStorage.getItem('refreshToken')
    }

    console.log(req)
    return this.api.post<void>('/public/auth/logout', req).pipe(
      tap(() => {
        localStorage.clear();
        this.currentUser$.next(null);
        this.router.navigate(['/auth/login']);
      })
    );
  }

  private loadUser(): AuthUser | null {
    const json = localStorage.getItem('currentUser');
    console.log('[AUTH] loadUser - currentUser from storage:', json);
    return json ? JSON.parse(json) : null;
  }
}

