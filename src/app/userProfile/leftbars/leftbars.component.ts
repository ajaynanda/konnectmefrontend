import { Component, OnInit } from '@angular/core';
import { navData, navProfileData } from 'src/app/leftbar/navData';
import {MatDialog} from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';
import { UserService } from 'src/app/user/user.service';
import { ChangePasswordComponent} from '../change-password/change-password.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-leftbars',
  templateUrl: './leftbars.component.html',
  styleUrls: ['./leftbars.component.css']
})
export class LeftbarsComponent implements OnInit {
  navdata=navData
  navProfile=navProfileData

  sidebarShow=false
  userdata:any;
  userid:string=''
  collapsed: boolean=true;
  constructor(private dialog:MatDialog,private userService:UserService,private router:Router) { }

  ngOnInit() {
    this.userService.getSideBar().subscribe((res)=>{
      this.collapsed=res
    })
    const user=JSON.parse( localStorage.getItem("KMuser") || '{}')
    this.userService.userByID(user._id).subscribe((result)=>{
      this.userdata=result
         })
  }
  dialogMenu(label:any){
   if(label=='Update'){
    this.dialog.open(UpdateComponent,{
      width: '50%',
      data:this.userdata 
   })
   }else if(label=='Change password'){
    this.dialog.open(ChangePasswordComponent,{
      width: '50%',
      data:this.userdata 
   })
   }else{
    this.router.navigate(['/user/dashboard'])
   } 
  }
  toggleCollapse(){
    this.collapsed=!this.collapsed
    this.userService.setSideBar(this.collapsed)
  }
  
}
