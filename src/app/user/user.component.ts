import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from './user.service';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUrl: any;
  sidebar: boolean=true;
  loaderState:boolean=false
  constructor(private router:Router,private route:ActivatedRoute,private userService:UserService,private loaderService:LoaderService) { }

  ngOnInit(): void {
    this.loaderService.getLoader().subscribe((res)=>{
      this.loaderState=res
      console.log(this.loaderState,"userpoints");    
    })
    this.userService.getSideBar().subscribe((res)=>{
      this.sidebar=res
    })
    this.currentUrl = this.router.url;
    console.log('Initial URL:', this.currentUrl);
    this.userService.setUrl(this.currentUrl)
    // Listen for changes in the URL
    this.router.events
      .pipe(filter((event):event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
        console.log('URL changed:', this.currentUrl);
      });
  }
  
}
