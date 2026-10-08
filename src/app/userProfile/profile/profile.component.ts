import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/postService/post.service';
import { UserService } from 'src/app/user/user.service';
import { LoaderComponent } from '../../loader/loader.component';
import { NgClass, NgStyle, TitleCasePipe } from '@angular/common';
import { LeftbarsComponent } from '../leftbars/leftbars.component';
import { PostbarsComponent } from '../postbar/postbar.component';
import { RightbarsComponent } from '../rightbar/rightbar.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LoaderComponent, NgClass, NgStyle, LeftbarsComponent, PostbarsComponent, RightbarsComponent, TitleCasePipe]
})
export class ProfileComponent implements OnInit {
  profile: boolean = true
  loaderState:boolean=false
  collapsed = true
  userid: any;
  userPost: [] = [];
  userData: any
  sidebar: boolean=true;
  constructor(private userService: UserService, private postService: PostService, private route: ActivatedRoute,private cf:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loaderState=true
    this.userService.getSideBar().subscribe((res)=>{
      console.log(res,"sidebars");
      this.sidebar=res
    })
    this.route.params.subscribe((res) => {
      console.log(res);     
      this.userid = res['id']
    })

    this.userService.userChanged.subscribe((data)=>{
      console.log(data,"hkgdfsg");
      if(data!=null)
       this.userData=data
      this.cf.detectChanges()
    })
    this.getPost()
    this.getUserData()
  }

getPost(){
  this.postService.postbyuserid(this.userid).subscribe((res: any) => {
    console.log(res,"post");
    this.userPost = res.data
    // this.loaderState=false
    this.cf.detectChanges()
  })
}
getUserData(){
  this.userService.userByID(this.userid).subscribe((res:any) => {
    console.log(res,"data");
    this.userData = res.data
    this.loaderState=false
    this.cf.detectChanges()
   
  })
}
}
