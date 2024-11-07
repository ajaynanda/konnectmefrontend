import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUrl: any;
  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    console.log('Initial URL:', this.currentUrl);

    // Listen for changes in the URL
    this.router.events
      .pipe(filter((event):event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
        console.log('URL changed:', this.currentUrl);
      });
  }
  
}
