import { Component, Input, OnInit, Output ,EventEmitter, HostListener} from '@angular/core';
import { navData, navProfileData } from './navData';
import { UserService } from '../user/user.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
interface sideNavToggle{
  screenWidth:number,
  collapsed:boolean
}
@Component({
    selector: 'app-leftbar',
    templateUrl: './leftbar.component.html',
    styleUrls: ['./leftbar.component.css'],
    imports: [RouterLink, RouterLinkActive]
})
export class LeftbarComponent implements OnInit {
  isMobileView = false;
  currentUrl: string='';
  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }
  checkScreenSize() {
    this.isMobileView = window.innerWidth < 768;  // Adjust the width as per your requirement
    if (this.isMobileView) {
      console.log("mobile view");
      
      this.collapsed = false;
    }
  }
  constructor(private userService:UserService) { }
@Input() profile=false
navdata=navData
navProfile=navProfileData
@Input() collapsed:boolean=false
sidebarShow=false
userName: string = ''
  ngOnInit(): void {
    const stored = localStorage.getItem('KMuser')
    if (stored) {
      try { this.userName = JSON.parse(stored).Name || 'User' } catch { this.userName = 'User' }
    }
    // this.userService.getSideBar().subscribe((res)=>{
    //   this.collapsed=res
    // })
    // this.userService.getUrl().subscribe((res)=>{
    //   this.currentUrl=res
    //   console.log(this.currentUrl,"ig");     
    // })
    // // console.log(this.navProfile);
    // console.log(this.collapsed);
    // console.log(this.navdata);
    
  }
  // toggleCollapse(){
  //   this.collapsed=!this.collapsed
  //   this.userService.setSideBar(this.collapsed)
  // }
  // changePage(data:any){
  //   this.userService.setUrl(data.routerLink)
  // }
}
