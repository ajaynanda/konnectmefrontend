import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
homeheader:Boolean=true
userheader:Boolean=false
adminheader:Boolean=false
isCollapsed = true;
isCollapsedUser = true;
isCollapsedAdmin = true;
  userid: any;
  currentUrl: string='';
  constructor(private router:Router,private service:AuthService) {
    const token = localStorage.getItem('KMtoken')
    if(token){
      this.userheader=true
      this.homeheader=false
      
    }
    this.router.events
    .pipe(filter((event):event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.currentUrl = event.urlAfterRedirects;
      console.log('URL changed:', this.currentUrl);
    });
   }

  ngOnInit(): void {
    this.service.getHeaderState().subscribe((res)=>{
      if(res=='user' || localStorage.getItem('KMtoken')){
        this.userheader=true
      this.homeheader=false
      }else if(res=='home' || !localStorage.getItem('KMtoken')){
        this.userheader=false
      this.homeheader=true
      }
    })
    if(this.userheader){
    this.userid=  JSON.parse(localStorage.getItem('KMuser') || '{}')._id
    }
  }
 logout(){
  localStorage.removeItem('KMuser')
  localStorage.removeItem('KMtoken')
  this.userheader=false
  this.homeheader=true
  this.service.setHeaderState('home')
  this.router.navigate(['/login'])
}

}
