import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification.service';
import { UserService } from 'src/app/user/user.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
data:any
  id: any;
  constructor(private dialogRef:MatDialogRef<UpdateComponent>,@Inject(MAT_DIALOG_DATA) private userdata:any,private userService:UserService,private notification:NotificationService) {}

  ngOnInit(): void {
    this.data=this.userdata.data
    this.id=JSON.parse( localStorage.getItem("KMuser") || '{}')._id
  }
closeDialog(){
  this.dialogRef.close(UpdateComponent)
}
update(updated:any){
console.log(updated.value);
this.userService.updateUser(this.id,updated.value).subscribe((result:any)=>{
console.log(result.data,"updated");
this.userService.updateUserById(result.data);
this.dialogRef.close(UpdateComponent)
},(err=>{
  console.log(err);
  this.notification.showError(err.error.message)
}))
}
cancelDialog(){
  this.dialogRef.close(UpdateComponent)
}
}
