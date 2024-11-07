import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { navData, navProfileData } from './navData';
interface sideNavToggle{
  screenWidth:number,
  collapsed:boolean
}
@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit {
  
  constructor() { }
@Input() profile=false
navdata=navData
navProfile=navProfileData
@Input() collapsed:boolean=true
sidebarShow=false
  ngOnInit(): void {
    // console.log(this.navProfile);
    console.log(this.collapsed);
    console.log(this.navdata);
    
  }
  // toggleCollapse(){
  //   this.collapsed=!this.collapsed
  // }
}
