import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    imports: [FormsModule, ReactiveFormsModule, RouterLink]
})
export class RegisterComponent implements OnInit {

  constructor(private fb:UntypedFormBuilder, private service:AuthService,private _Router:Router) { }
  registerForm=this.fb.group({
    fname:new UntypedFormControl('',Validators.required),
    lname:new UntypedFormControl('',[Validators.required]),
    email:new UntypedFormControl('',[Validators.required,Validators.email]),
    password:new UntypedFormControl('',[Validators.required,Validators.minLength(6)]),
    cpassword:new UntypedFormControl('',[Validators.required,Validators.minLength(6)]),
    },
    {
      validators:this.mustmatch("password", "cpassword")
    })
  ngOnInit(): void {
  }
register(){
console.log(this.registerForm.value);
this.service.Register(this.registerForm.value).subscribe((result:any)=>{
  console.log(result);
  if(result.Success) this._Router.navigate(['/login'])
  else{
    console.log("errro")
  }
})
}
mustmatch(password:any,cpassword:any){
  return (formGroup:UntypedFormGroup)=>{
    const passwordcontrol=formGroup.controls[password]
    const cpasswordcontrol=formGroup.controls[cpassword]
    if(cpasswordcontrol.errors && !cpasswordcontrol.errors['mustmatch']){
      return 
    }
    if(passwordcontrol.value!=cpasswordcontrol.value){
      cpasswordcontrol.setErrors({mustmatch:true})
    }else{
      cpasswordcontrol.setErrors(null)
    }
  }
}

get controls(){
  return this.registerForm.controls
}

}


