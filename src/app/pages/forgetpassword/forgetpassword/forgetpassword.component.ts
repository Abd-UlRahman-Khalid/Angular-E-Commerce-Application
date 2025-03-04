import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {

  step:number=1;
  isLoading:boolean=false
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);

  verifyEmail:FormGroup = new FormGroup({
    email:new FormControl(null,  [Validators.required , Validators.email])
  })
  verifytCode:FormGroup = new FormGroup({
    resetCode:new FormControl(null,  [Validators.required , Validators.pattern(/^[0-9]{6}$/)])
  })
  resetPassword:FormGroup = new FormGroup({
    email:new FormControl(null,  [Validators.required , Validators.email]),
    newPassword:  new FormControl(null,
      [
        Validators.required,
        Validators.pattern(/^\w{6,}$/)
      ]
    )
  })

  verifyEmailSubmit():void{

    let emailValue=this.verifyEmail.get('email')?.value

    this.resetPassword.get('email')?.patchValue(emailValue)

    this.isLoading=true;
    this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.statusMsg === 'success'){
          this.step = 2 
        }
        this.isLoading=false;
      },
      error:(error)=>{
        console.log(error);
        this.isLoading=false;
      }
    })
  }
  verifyCodeSubmit():void{
    this.isLoading=true;
    this.authService.setCodeVerify(this.verifytCode.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'Success'){
          this.step = 3
        }
        this.isLoading=false;
      },
      error:(error)=>{
        console.log(error);
        this.isLoading=false;
      }
    })
  }
resetPasswordSubmit():void{
  this.isLoading=true;
    this.authService.setResetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res);
        localStorage.setItem("userToken",res.token);
        this.isLoading=false;
        this.authService.saveUserData();
        this.router.navigate(['/home'])
      },
      error:(error)=>{
        console.log(error);
        this.isLoading=false;
      }
    })
  }
}
