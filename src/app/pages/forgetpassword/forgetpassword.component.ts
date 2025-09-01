import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import{FormControl, FormGroup, ReactiveFormsModule, Validators} from'@angular/forms';
import { AuthService } from 'auth';
import { pattren } from '../../shared/enviroment/pattrenpasswored';


@Component({
  selector: 'app-forgetpassword',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  _authService=inject(AuthService);
  _router=inject(Router)
  step:number=1;
  showPassword = false;

  verfiyemail:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  });
    verfiycode:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6}$/)])
  });
    resetpassword:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(pattren.pass)])
  });
submitemail():void{
  let veryemail=this.verfiyemail.get('email')?.value;
  this.resetpassword.get('email')?.patchValue(veryemail);
if(this.verfiyemail.valid){
    this._authService.vrefyemail(this.verfiyemail.value).subscribe(
    {
      next:(res)=>{
        if(res.message =='success'){
          this.step=2;
        }
      }
    }
  )
}else{
  this.verfiyemail.markAllAsTouched()
}

};
submitcode():void{
if(this.verfiycode.valid){
      this._authService.vrefycode(this.verfiycode.value).subscribe(
    {
      next:(res)=>{
        if(res.status =='Success'){
          this.step=3;
        }
      }
    }
  )
}else{
  this.verfiycode.markAllAsTouched()
}
};
submitpassword():void{
if(this.resetpassword.valid){
    this._authService.vrefypasswored(this.resetpassword.value).subscribe({
    next:(res)=>{
        localStorage.setItem("token",res.token)
        console.log(res)
        console.log(res.token)
        this._router.navigate(['/subjects'])
    }
  })
}else{
  this.resetpassword.markAllAsTouched()
}
};
     togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
