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
  constructor(private service:AuthService,private fb:FormBuilder,private route:Router) { }
  LoginForm=this.fb.group({
      email:new FormControl('',[Validators.email,Validators.required]),
      password:new FormControl('',[Validators.required,Validators.minLength(6)])
  })
  login(){
    console.log(this. LoginForm.value);
    this.service.Login(this.LoginForm.value).subscribe((result:any)=>{
      if(result){
        console.log(result);
        localStorage.setItem('KMuser',JSON.stringify(result.user))
        localStorage.setItem('KMtoken',result.token)
        this.authenticated=true
        this.route.navigate(['/user/dashboard'])    
        setTimeout(()=>{
          window.location.reload()
        },500)
      }
    },(err=>{
      console.log(err);
      
    }))
    }
  ngOnInit(): void {
    this.service.Alluser().subscribe((result:any)=>{
      console.log(result)
    })
  }

get controls(){return this.LoginForm.controls}
}
