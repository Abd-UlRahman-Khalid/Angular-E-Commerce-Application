import { Component, inject } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

private readonly authService=inject(AuthService)
private readonly formBuilder=inject(FormBuilder)
private readonly router=inject(Router)

isLoading:boolean=false
msgError:string="";
isSuccess:string="";
register:FormGroup=this.formBuilder.group({
  name:[null , [      Validators.required,      Validators.minLength(3),      Validators.maxLength(20),    ]   ],
  email:[null ,  [      Validators.required,      Validators.email    ]],
  password:[null ,  [      Validators.required,      Validators.pattern(/^[A-Z]\w{7,}$/)    ]],
  rePassword:[null , [      Validators.required,  ] ],
  phone:[null , [      Validators.required,      Validators.pattern(/^01[0125][0-9]{8}$/)    ]]
} , { validators : this.confirmPassword})
//   register:FormGroup =new FormGroup({
//   name:new FormControl(null ,      [      Validators.required,      Validators.minLength(3),      Validators.maxLength(20),    ]  ),
//   email:new FormControl(null ,    [      Validators.required,      Validators.email    ]  ),
//   password:new FormControl(null,    [      Validators.required,      Validators.pattern(/^[A-Z]\w{7,}$/)    ]  ),
//   rePassword:new FormControl(null,    [      Validators.required,  ]  ),
//   phone:new FormControl(null,    [      Validators.required,      Validators.pattern(/^01[0125][0-9]{8}$/)    ]  ),
// } , {
//   validators : this.confirmPassword
// })

submitForm():void{
      if(this.register.valid){
        this.isLoading=true
        this.authService.sendRegisterForm(this.register.value).subscribe({
          next:(res)=>{
            console.log(res);
            if(res.message === 'success'){
              // navigate path login
              // routerlink programming routing

              
             setTimeout(()=>{

       

              //2-nav
              this.router.navigate(['/login'])

             },500)

              this.isSuccess=res.message

            }
            this.isLoading=false
          },
          error:(error:HttpErrorResponse)=>{
            console.log(error);
           this.msgError= error.error.message
            this.isLoading=false
          }
        
        })
      }else{
        this.register.markAllAsTouched()
      }
}
confirmPassword( group:  AbstractControl){
    // password
    let password=group.get('password')?.value
    let rePassword=group.get('rePassword')?.value
    //  rePassword

    return password === rePassword ? null : {mismatch:true}

}
}
