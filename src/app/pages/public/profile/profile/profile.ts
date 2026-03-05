import {Component, inject, OnInit, signal} from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {AuthUser} from '../../../../core/interface/entity/auth/auth-user';
import {AuthUserService} from '../../../../core/service/auth/auth-user-service';
import {AuthUserCard} from '../../../../shell/components/card/auth/auth-user-card/auth-user-card';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {AuthUserRequest} from '../../../../core/interface/request/auth/auth-user-request';

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzRowDirective,
    ReactiveFormsModule,
    AuthUserCard,
    NzSpinComponent
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private destroy$ = new Subject<void>();
  userService = inject(AuthUserService);
  loading = signal<boolean>(false)

  user = signal<AuthUser | null>(null);
  constructor(){
    const username = this.getUsername();
    const email = this.getEmail();
    const id = this.getId();
    this.loading.set(true)
    if (username && email && id){
      this.userService.getUser(username, id, email).subscribe({
        next: (response) => {
          this.user.set(response);
         this.loading.set(false);
        },
        error: (err)=> {
          this.loading.set(false);
          console.error(err);
        }
      });
    }
  }

  getUsername(){
    return localStorage.getItem('username')
  }

  getEmail(){
    return localStorage.getItem('email')
  }

  getId(){
    return localStorage.getItem('id');
  }

  validateForm = this.fb.group({
    email: this.fb.control('', [Validators.email, Validators.required]),
    password: this.fb.control('', [Validators.required]),
    checkPassword: this.fb.control('', [Validators.required, this.confirmationValidator])
  })

  ngOnInit(): void {
    this.validateForm.controls.password.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.validateForm.controls.checkPassword.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const request: AuthUserRequest = {
        email: this.validateForm.value.email!,
        password: this.validateForm.value.password!
      }
      this.userService.updatePassword(request).subscribe({
        next: (res) => {
          this.user.set(res);
        },
        error: (err) => {
          console.log(err);
        }
      })
      // console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  confirmationValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== control.parent!.value.password) {
      return { confirm: true, error: true };
    }
    return {};
  }

}
