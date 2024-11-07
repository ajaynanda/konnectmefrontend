import { Component, Input, OnInit } from '@angular/core';
import { navData, navProfileData } from 'src/app/leftbar/navData';
import {MatDialog} from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-leftbars',
  templateUrl: './leftbars.component.html',
  styleUrls: ['./leftbars.component.css']
})
export class LeftbarsComponent implements OnInit {
  @Input() profile=false
  navdata=navData
  navProfile=navProfileData
  @Input() collapsed:boolean=true
  sidebarShow=false
  userdata:any;
  userid:string=''
  constructor(private dialog:MatDialog,private userService:UserService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    const user=JSON.parse( localStorage.getItem("KMuser") || '{}')
     console.log(user._id);
  
    this.userService.userByID(user._id).subscribe((result)=>{
      console.log(this.userid);
      
      console.log(result,"resulted"); 
      this.userdata=result
         })
         
   
   console.log(this.userdata);
   
  
  }
  dialogMenu(label:any){
    console.log(label);
    
   if(label=='Update'){
    console.log(label);
    
    this.dialog.open(UpdateComponent,{
      width: '50%',
      data:this.userdata 
   })
   }else if(label=='Change password'){
    this.dialog.open(ChangePasswordComponent,{
      width: '50%',
      data:this.userdata 
   })
   }else if(label=='Settings'){
  //   this.dialog.open(SettingsComponent,{
  //     width: '50%',s
  //     data:this.userdata 
  //  })
   }else{
    this.router.navigate(['/user/dashboard'])
   }
  
  }
  
}
