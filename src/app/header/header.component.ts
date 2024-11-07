import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
homeheader:Boolean=true
userheader:Boolean=false
adminheader:Boolean=false

collapsed=false
  userid: any;
  constructor(private router:Router) {
    const token = localStorage.getItem('KMtoken')
    if(token){
      this.userheader=true
      this.homeheader=false
      
    }
   }

  ngOnInit(): void {
    if(this.userheader){
    this.userid=  JSON.parse(localStorage.getItem('KMuser') || '{}')._id
    console.log(this.userid);
    
    }
  }
 logout(){
  localStorage.removeItem('KMuser')
  localStorage.removeItem('KMtoken')
  this.userheader=false
  this.homeheader=true
  this.router.navigate(['/login'])
}
}
