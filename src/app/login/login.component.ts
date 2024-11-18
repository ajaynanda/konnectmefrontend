import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
authenticated=false
  email: any='';
  emailsend: boolean=false;
  constructor(private service:AuthService,private fb:FormBuilder,private route:Router) { }
  LoginForm=this.fb.group({
      email:new FormControl('',[Validators.email,Validators.required]),
      password:new FormControl('',[Validators.required,Validators.minLength(6)])
  })
  login(){
    console.log(this. LoginForm.value);   
    this.service.Login(this.LoginForm.value).subscribe((result:any)=>{  
      console.log(result);
      
      if(result.user.emailverify){
        console.log(result);
        localStorage.setItem('KMuser',JSON.stringify(result.user.user))
        localStorage.setItem('KMtoken',result.token)
        this.authenticated=true
        this.service.setHeaderState('user')
        this.route.navigate(['/user/dashboard'])    
        // setTimeout(()=>{
        //   window.location.reload()
        // },500)
      }else{
        localStorage.setItem('_v',JSON.stringify(result.user.user.Email))
        localStorage.setItem('_vt',JSON.stringify(result.user.user.verificationToken))
        // this.route.navigate(['/login'])    
       
        window.open('http://localhost:4200/login')
      }
    },(err=>{
      console.log(err);
      
    }))
    }
  ngOnInit(): void {
    if(localStorage.getItem('_v')){
      this.email=JSON.parse(localStorage.getItem('_v') || '{}')
    }else{
      this.email=''
    }
    this.service.Alluser().subscribe((result:any)=>{
      console.log(result)
    })
  }
verifyEmail(){
  // window.open(`http://localhost:5000/verifyemail?token=${JSON.parse(localStorage.getItem('_vt') || '{}')}`, '_blank');
  console.log(this.email,"em");
  
  let form=new FormData()
  form.append('email',this.email)
  this.service.sendEmail(form).subscribe((res)=>{
    console.log(res,"res");
    this.emailsend=true
  },(err=>{
    console.log(err);
    
  }))
}
reLogin(){
  this.emailsend=false
  localStorage.removeItem('_v')
  localStorage.removeItem('_vt')
  this.route.navigate(['/login'])
  console.log(this.email,"i");
  
}
get controls(){return this.LoginForm.controls}
}
