import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  id: any;

  constructor(private dialogRef:MatDialogRef<ChangePasswordComponent>,private userService:UserService,private fb:FormBuilder,private notification:NotificationService) { }

  ngOnInit(): void {
    this.id=JSON.parse( localStorage.getItem("KMuser") || '{}')._id
  }
  cancelDialog(){
this.dialogRef.close(ChangePasswordComponent)
  }
  passwordForm=this.fb.group({
    opassword:new FormControl('',[Validators.required,Validators.minLength(6)]),
    npassword:new FormControl('',[Validators.required,Validators.minLength(6)]),
    cpassword:new FormControl('',[Validators.required,Validators.minLength(6)])
  },{
    validators:this.mustmatch("npassword", "cpassword")
  })
  newPassword(formData:NgForm){
    console.log(formData);
    this.userService.changePassword(this.id,formData).subscribe((result)=>{
      console.log(result);
      this.dialogRef.close(ChangePasswordComponent)
    },(err=>{
      console.log(err.error.message);
      this.notification.showError(err.error.message)
    }))
  }
  closeDialog(){
    this.dialogRef.close(ChangePasswordComponent)
  }
  mustmatch(password:any,cpassword:any){
    return (formGroup:FormGroup)=>{
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
   return  this.passwordForm.controls
  }
}
