import {Component, inject, signal} from '@angular/core';
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
    AuthUserCard
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
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
    username: this.fb.control('',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
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
      console.log('submit', this.validateForm.value);
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
