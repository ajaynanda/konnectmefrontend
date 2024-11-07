import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { NotificationService } from 'src/app/notification.service';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private fb:FormBuilder,private route:Router,private authService:AuthService,private notification:NotificationService) {

  }
  forgotForm=this.fb.group({
    email:new FormControl('',[Validators.email,Validators.required])
  })

   
  ngOnInit(): void {
  }
submit(){
  if(this.forgotForm.valid){
    console.log(this.forgotForm.value,"forms");
    this.authService.forgotPassword(this.forgotForm.value).subscribe((result:any)=>{
        console.log(result,"resulted")
    },((err:any)=>{
      console.log(err.error.message)
      this.notification.showError(err.error.message)
    }))
  }

  
}
get controls(){return this.forgotForm.controls}
}
