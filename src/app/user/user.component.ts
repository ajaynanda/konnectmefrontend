import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from './user.service';
import { LeftbarComponent } from '../leftbar/leftbar.component';
import { SharebarComponent } from '../sharebar/sharebar.component';
import { PostbarComponent } from '../postbar/postbar.component';
import { RightbarComponent } from '../rightbar/rightbar.component';
import { ChatComponent } from '../chat/chat.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    imports: [LeftbarComponent, SharebarComponent, PostbarComponent, RightbarComponent, ChatComponent]
})
export class UserComponent implements OnInit {
  currentUrl: any;
  sidebar: boolean = false; // Start collapsed

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // this.userService.getSideBar().subscribe((res) => {
    //   this.sidebar = res;
    // });

    this.currentUrl = this.router.url;
    // this.userService.setUrl(this.currentUrl);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }

}
