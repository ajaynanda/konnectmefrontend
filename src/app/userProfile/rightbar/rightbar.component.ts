import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { RouterLink } from '@angular/router';
import { TitleCasePipe, DatePipe } from '@angular/common';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
    selector: 'app-rightbars',
    templateUrl: './rightbar.component.html',
    styleUrls: ['./rightbar.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, TitleCasePipe, DatePipe, EmptyStateComponent]
})
  export class RightbarsComponent implements OnInit, OnChanges {
@Input() userdata:any
  frnd: any=[];
  followList:any=[]
  moreFollowing: boolean=false;
  moreFriend: boolean=false;

  constructor(private userService:UserService,private cf:ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userdata'] && this.userdata?._id) {
      this.getList();
    }
  }

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
