import { Component, inject, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'auth';
import { pattren } from '../../shared/enviroment/pattrenpasswored';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgetpassword',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];

  _authService = inject(AuthService);
  _router = inject(Router);
  step: number = 1;
  showPassword = false;

  verfiyemail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  verfiycode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6}$/)])
  });

  resetpassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(pattren.pass)])
  });

  submitemail(): void {
    let veryemail = this.verfiyemail.get('email')?.value;
    this.resetpassword.get('email')?.patchValue(veryemail);

    if (this.verfiyemail.valid) {
      const sub = this._authService.vrefyemail(this.verfiyemail.value).subscribe({
        next: (res:any) => {
          if (res.message == 'success') {
            this.step = 2;
          }
        }
      });
      this.subscriptions.push(sub);
    } else {
      this.verfiyemail.markAllAsTouched();
    }
  }

  submitcode(): void {
    if (this.verfiycode.valid) {
      const sub = this._authService.vrefycode(this.verfiycode.value).subscribe({
        next: (res:any) => {
          if (res.status == 'Success') {
            this.step = 3;
          }
        }
      });
      this.subscriptions.push(sub);
    } else {
      this.verfiycode.markAllAsTouched();
    }
  }

  submitpassword(): void {
    if (this.resetpassword.valid) {
      const sub = this._authService.vrefypasswored(this.resetpassword.value).subscribe({
        next: (res:any) => {
          localStorage.setItem("token", res.token);
          this._router.navigate(['/subjects']);
        }
      });
      this.subscriptions.push(sub);
    } else {
      this.resetpassword.markAllAsTouched();
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy(): void {
    // إلغاء جميع الاشتراكات المفتوحة
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
