import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../postService/post.service';
@Component({
  selector: 'app-postbar',
  templateUrl: './postbar.component.html',
  styleUrls: ['./postbar.component.css']
})
export class PostbarComponent implements OnInit {
likes?:boolean
count:any=0
feedPost:any
  userid: any;
  commentPost: boolean=false;
  index: any;
  postLiked: any[]=[];
  editComments: boolean=false;
  commentError:boolean=false
  addReplys:boolean=false
  editIndex:any=null;
  editReplyIndex:any=null
  postData:any= null
  commentData:any=null
  replyData:any=null
  editReplyComments:boolean=false
  dropdownIndex: number | null = null; 
  dropdownReplyIndex:number | null =null;
  constructor(private postservice:PostService) { }

  ngOnInit(): void {
   const user=JSON.parse( localStorage.getItem("KMuser") || '{}')
   console.log(user._id);
   this.userid=user._id
  this.feedPosts()
  
  }
  feedPosts(){
    this.postservice.timeline(this.userid).subscribe((res:any)=>{
      console.log(res.data);
      this.feedPost=res.data
      this.getLikes(this.feedPost)
      // console.log(this.feedPost[2].Likes[0].userid,"Likes")
     })
  }
  toggle(id:any,index:any,post:any){
    this.postLiked[index]=!this.postLiked[index]
      this.liked(index,id)
  }
  getLikes(post:any){
    let elID:any[]=[]
    post.forEach((element:any) => {
    const lk=  element.Likes.filter((x:any)=>{
      if(x.userid==this.userid){
       elID.push(x)
        return true
      }else{
        return false
      } 
    }) 
      return elID
    });
  }
liked(index:number,post:any){
  // console.log(post,"post")
 this.index=index
 this.postservice.like(this.userid,post).subscribe((res:any)=>{
  // console.log(res,"resk");
  if (res.data.Success) {
    console.log(res.data.Success)
    this.likes=true
    console.log(this.likes)
    this.feedPosts()
  }
  else{this.likes=false
    this.feedPosts()
  }
  
 })
}
commentArray(comments:NgForm,postid:number){
  console.log(comments.value);
    this.commentPost=true
    console.log(this.userid,postid);
    const formdata=new FormData
    formdata.append('comment',comments.value.comment)
    this.postservice.comment(this.userid,postid,comments.value).subscribe((res:any)=>{
      console.log(res);
      this.feedPosts()
    },(err)=>{
      console.log(err);   
    })
}
// comment(index:number){
//   this.index=index
//   this.commentPost=!this.commentPost
// }
comment(index:any,post:any){
  if(post._id===this.postData?._id){
    this.postData=null
  }else{
    this.postData=post
    // this.index=index
  }
 
   this.commentError=false
   this.editComments=false
   this.editIndex=null
  
   this.dropdownIndex=null
   this.dropdownReplyIndex=null
  //  this.commentPost=!this.commentPost
 }

 toggleDropdown(index: number,post:any) {
  this.dropdownReplyIndex=null
   this.dropdownIndex = this.dropdownIndex === index ? null : index;
   this.postData=post
   console.log(post)
   console.log(this.dropdownIndex)
 }
 toggleDropdownReply(index:any,rep:any){
  this.dropdownIndex=null
  this.dropdownReplyIndex=this.dropdownReplyIndex===index?null:index
  this.commentData=rep
 }
 openEditComment(post:any,comment:any,index:number){
  this.editComments=true
  this.editIndex=index
  this.postData=post
  this.dropdownIndex=null
  this.commentData=comment
  this.replyData=null
  this.editReplyComments=false
  this.editReplyIndex=null
  console.log(this.commentData,"dat com")
 }
 editComment(postid:any,comment: any,edit:any) {
  //  console.log("Editing comment:", edit.value);
   this.postservice.editComment(postid,comment,{comment:edit.value}).subscribe((res)=>{
    console.log(res);
    this.editComments=false
    this.dropdownIndex=null
    // this.postData=null
    this.commentData=null
    this.editIndex=null
   }) 
 }
 cancelEditComment(){
  // this.postData=null
  this.commentData=null
  this.editComments=false
  this.dropdownIndex=null
  this.editIndex=null
 }
 deleteComment(postid:any,comment: any) {
  //  console.log("Deleting comment:", comment);
   this.postservice.deleteComment(postid,comment._id).subscribe((res)=>{
    // console.log(res,"deketed");
    this.commentData=null
    this.dropdownIndex=null
    this.editComments=false
    this.feedPosts()
   },(err)=>{
      console.log(err);
      
   })
 }

 editReplyComment(repid:any,commentid:any,edits:any){
  this.postservice.editReplyComment(this.postData._id,commentid,repid,{comment:edits.value}).subscribe((res)=>{
    // console.log(res,"response edioits"); 
    this.feedPosts()
    this.editReplyComments=false
    this.replyData=null
    this.dropdownReplyIndex=null
  },(err=>{
    console.log(err);
    
  }))
}
openReplyComment(post:any,comment:any,index:any){
  this.addReplys=true
}
addReply(postid:number,commentid:number,edits:any){
  // console.log(edits.value,"values")
  this.dropdownIndex=null
  const user = JSON.parse(localStorage.getItem('KMuser') || '{}');
  let data={
    profileImg:user.Profilepic?user.Profilepic:'',
    comment:edits.value,
    userid:user._id,
    Name:`${user.Firstname} ${user.Lastname}`,
    createdAt:new Date(),
    updatedAt:new Date()

  }
  this.postservice.addReplyComment(postid,commentid,data).subscribe((result)=>{
    console.log(result)
    this.replyData=null
    this.feedPosts()
  })
}
cancelReplyComment(){
  this.addReplys=false
  this.dropdownReplyIndex=null
  this.replyData=null
  this.editReplyComments=false
}
openEditReplyComment(post:any,comment:any,rep:any,index:any){
  this.editReplyComments=true
  this.dropdownReplyIndex=null
  this.editReplyIndex=index
  this.editComments=false
  this.editIndex=null
  this.replyData=rep
  // this.commentData=comment
}
deleteReplyComment(postid:any,commentid:any,rep: any){
  this.postservice.deleteReplyComment(postid,commentid,rep._id).subscribe((result)=>{
      // console.log(result,"result");
      this.editReplyComments=true
      this.replyData=null
      this.dropdownReplyIndex=null
      this.feedPosts()     
  })
}
 replyToComment(comment: any) {
   console.log("Replying to comment:", comment);
 }
}
