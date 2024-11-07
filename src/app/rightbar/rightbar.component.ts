
import { Component, OnInit} from '@angular/core';
import { PostService } from '../postService/post.service';
import { UserService } from '../user/user.service';
@Component({
  selector: 'app-rightbar',
  templateUrl: './rightbar.component.html',
  styleUrls: ['./rightbar.component.css']
})
export class RightbarComponent implements OnInit {
  suggestionArray:any=[];
  frndName = {}
  moreFollowers:boolean=false
  followers: any = [];
  data:any={}
  user = JSON.parse(localStorage.getItem("KMuser") || '{}') 
  suggestionsArray:any=[];
  followings:any=[]
  birthArray:any=[];
  follow!: boolean;
  carouselConfig = {
    "slidesToShow": 2, 
    "slidesToScroll": 2,
    "arrows": true,
    "dots":false,
    "infinite":false
  };
  followStatus: any[]=[];
  constructor(private userService: UserService, private postService: PostService) {
  }

  ngOnInit() {
    this.getUserdata()
  }
  getUserdata(){
    this.userService.userByID(this.user._id).subscribe((result:any)=>{
      this.data=result.data
      this.suggestionArray=this.data.userSuggestion 
      this.followers=this.data.Followers  
}) 
  }
   compareDates(){
    const date2 = new Date()
    const array=  this.followers.some((el:any)=>{
    if(new Date(el.dob).getDate()==date2.getDate()){
      const data={
                name:el.Name,
                id:el.userid,
           }
           this.birthArray.push(data)           
    }
   })
   }
   toggle(id:number,index:number,text:string){
  switch(text){
    case 'Follow':
      this.userFollow(id,index);
      this.suggestionArray[index].text = 'Unfollow';
      break;
    case 'Unfollow':
      this.userUnFollow(id,index);
      this.suggestionArray[index].text = 'Follow';
      break;
    case 'Follow back':
      this.userFollow(id,index);
      this.suggestionArray[index].text = 'Unfollow';
      break;
    default:
      this.userFollow(id,index)
  }
}
  userFollow(id:number,index:number){
    this.userService.userFollow(this.user._id,id).subscribe((res:any)=>{
  
    },(err=>{
      console.log(err,"error"); 
    }))
  }
  userUnFollow(id:number,index:number){
    this.userService.userUnfollow(this.user._id,id).subscribe((res:any)=>{
    },(err=>{
    console.log(err,"err")}))
  }
  moreFollower(){
    this.moreFollowers=!this.moreFollowers
  }
  removeFollower(data:any){
    console.log(data);
    this.userService.removeFollower(this.data.userid,data._id).subscribe((res)=>{
    console.log(res,"jhg");
})
  }
}