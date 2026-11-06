import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    imports: [RouterLink, NgIf]
})
export class FooterComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Check on load
    this.isLoggedIn = !!localStorage.getItem('KMtoken');
    // Re-check on every route change (handles login/logout)
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.isLoggedIn = !!localStorage.getItem('KMtoken');
      });
  }

}
