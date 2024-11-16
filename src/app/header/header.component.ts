import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

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
  constructor(private router:Router) {
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
    if(this.userheader){
    this.userid=  JSON.parse(localStorage.getItem('KMuser') || '{}')._id
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
