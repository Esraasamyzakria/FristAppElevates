import { Component, inject, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'auth';
import { HttpErrorResponse } from '@angular/common/http';
import { pattren } from '../../shared/enviroment/pattrenpasswored';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  isloading: boolean = false;
  showPassword = false;
  messerror: string = '';

  private loginSubscription!: Subscription; // نحتفظ بالـ subscription

  _authService = inject(AuthService);
  _router = inject(Router);

  loginform: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(pattren.pass)]),
  });

  submitform() {
    if (this.loginform.valid) {
      this.isloading = true;

      // نخزن الـ subscription
      this.loginSubscription = this._authService.login(this.loginform.value).subscribe({
        next: (res:any) => {
          if (res.message === "success") {
            localStorage.setItem("token", res.token);
            this._router.navigate(['/subjects']);
          }
          this.isloading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.messerror = err.error.message;
          this.isloading = false;
        }
      });

    } else {
      this.loginform.markAllAsTouched();
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
