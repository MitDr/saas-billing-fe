import {Component, inject, OnDestroy} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Subject} from 'rxjs';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {AuthService} from '../../../core/service/auth-service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzInputDirective,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzRowDirective
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnDestroy {
  loginForm = {
    username: '',
    password: ''
  };
  loading = false;
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
  ) {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    this.loading = true;

    console.log('👉 SUBMIT ĐÃ CHẠY TỪ ANGULAR');
    console.log('FORM DATA:', this.loginForm);


    console.log(this.loginForm)
    console.log(this.loginForm.username)

    const body = {
      username: this.loginForm.username,
      password: this.loginForm.password,

      deviceId: this.getDeviceId()
    };

    console.log('BODY GỬI API:', body);

    this.authService.login(body).subscribe({
      next: () => {
        console.log('✅ LOGIN SUCCESS:');
        this.loading = false;
        const role = this.authService.currentUser?.role;
        this.authService.bootstrapAuth();

        if (role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/app/dashboard']);
        }
      },
      error: () => {
        this.loading = false;
      }
    });
    //   this.authService.login(loginPayload).subscribe({
    //     next: (res: any) => {
    //       // Giả sử API trả về { accessToken, refreshToken, user: { role: 'ADMIN' | 'USER' } }
    //       this.authService.storeTokens({
    //         accessToken: res.accessToken,
    //         refreshToken: res.refreshToken,
    //         expiresIn: res.expiresIn || 3600
    //       });
    //
    //       // Lưu role (hoặc toàn bộ user info)
    //       localStorage.setItem('userRole', res.user.role);
    //       localStorage.setItem('currentUser', JSON.stringify(res.user));
    //
    //       this.message.success('Đăng nhập thành công!');
    //       this.loading = false;
    //
    //       // Chuyển hướng dựa trên role
    //       const role = res.user.role;
    //       if (role === 'ADMIN') {
    //         this.router.navigate(['/admin/dashboard']);
    //       } else {
    //         this.router.navigate(['/user/dashboard']);
    //       }
    //     },
    //     error: (err) => {
    //       this.message.error(err.error.message || 'Đăng nhập thất bại');
    //       this.loading = false;
    //     }
    //   });

  }

  private getDeviceId(): string {
    const id = localStorage.getItem('deviceId');
    if (!id) {
      const newId = crypto.randomUUID();   // API chuẩn của browser
      localStorage.setItem('deviceId', newId);
      return newId;
    }
    return id;
  }
}
