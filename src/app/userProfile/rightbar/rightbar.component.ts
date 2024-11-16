import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-rightbars',
  templateUrl: './rightbar.component.html',
  styleUrls: ['./rightbar.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class RightbarsComponent implements OnInit {
@Input() userdata:any
  frnd: any=[];
  followList:any=[]
  moreFollowing: boolean=false;
  moreFriend: boolean=false;

  constructor(private userService:UserService,private cf:ChangeDetectorRef) { }

  ngOnInit(): void {
 this.userService.userChanged.subscribe((data)=>{
      if(data!=null){ 
         this.userdata=data
         this.cf.detectChanges()
        }
       if(this.userdata?._id) this.getList()
    })
  }
  getList(){
    this.userService.userByID(this.userdata?._id).subscribe((res:any)=>{
      this.frnd=res.data?.Friends
      this.followList=res.data?.Followings
      this.cf.detectChanges()
     })
  }
  moreFollowings(){
    this.moreFollowing=!this.moreFollowing
  }
  moreFriends(){
    this.moreFriend=!this.moreFriend
  }
  userUnfollow(id:number){
    this.userService.userUnfollow(this.userdata._id,id).subscribe((res:any)=>{
    },(err=>{
    console.log(err,"err")}))
  }
  removeFriends(data:any){
    console.log(data);
    
  }
}
