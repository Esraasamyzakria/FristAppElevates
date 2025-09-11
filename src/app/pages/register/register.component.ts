import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'auth';
import { pattren } from '../../shared/enviroment/pattrenpasswored';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  private registerSubscription!: Subscription; // نخزن الـ subscription

  _authService = inject(AuthService);
  _router = inject(Router);

  isloading: boolean = false;
  showPassword = false;
  messerror: string = '';

  rgisterform: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(pattren.pass)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, { validators: this.confirempassword });

  submitform() {
    if (this.rgisterform.valid) {
      this.isloading = true;

      // نخزن الـ subscription هنا
      this.registerSubscription = this._authService.register(this.rgisterform.value).subscribe({
        next: (res:any) => {
          if (res.message === 'success') {
            this._router.navigate(['/login']);
          }
          this.isloading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.messerror = err.error.message;
          this.isloading = false;
        }
      });
    } else {
      this.rgisterform.markAllAsTouched();
    }
  }

  confirempassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const repassword = group.get('rePassword')?.value;
    return password === repassword ? null : { 'mismatch': true };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }
}
