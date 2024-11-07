import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../../postService/post.service';
import { invalid } from '@angular/compiler/src/render3/view/util';
@Component({
  selector: 'app-postbars',
  templateUrl: './postbar.component.html',
  styleUrls: ['./postbar.component.css']
})
export class PostbarsComponent implements OnInit {
likes:Boolean=false
count:any=0
feedPost:any
commentError:boolean=false
  userid: any;
  @Input() userpost:any
  @Input() index:any
  commentPost: boolean=false;
  editComments: boolean=false;
  addReplys:boolean=false
  editIndex:any=null;
  editReplyIndex:any=null
  postData:any= null
  commentData:any=null
  replyData:any=null
  editReplyComments:boolean=false
  dropdownIndex: number | null = null; 
  dropdownReplyIndex:number | null =null;
  // index: any;
  constructor(private postservice:PostService){}

  ngOnInit(): void {
    console.log(this.userpost,"posts")
   const user=JSON.parse( localStorage.getItem("KMuser") || '{}')
   console.log(user._id);
   this.userid=user._id
  //  this.postservice.postbyuserid(user._id).subscribe((res:any)=>{
  //   console.log(res.data);
  //   this.feedPost=res.data
  //  })
  }
// liked(event:any,post:any){
//  this.likes=!this.likes
//  this.postservice.like(this.userid,post).subscribe((res)=>{
//   console.log(res);
  
//  })
// }
liked(index:number,post:any){
  this.index=index
  this.postservice.like(this.userid,post).subscribe((res:any)=>{
   console.log(res);
   if (res.data.Success) {
     console.log(res.data.Success)
     this.likes=true
     console.log(this.likes)
    //  this.feedPosts()
   }
   else{this.likes=false
    //  this.feedPosts()
   }
   
  })
 }
 commentArray(comments:NgForm,postid:number){
   console.log(comments.value);
   if(comments.value.comment!=''){
    this.commentError=false
    const user = JSON.parse(localStorage.getItem('KMuser') || '{}');
    let data={
      profileImg:user.Profilepic?user.Profilepic:'',
      comment:comments.value.comment,
      userid:user._id,
      Name:`${user.Firstname} ${user.Lastname}`

    }
     this.commentPost=true
    //  const formdata=new FormData
    //  formdata.append('comment',comments.value.comment)
     this.postservice.comment(this.userid,postid,data).subscribe((res:any)=>{
       console.log(res);
       
       this.getUserPost()
       comments.reset()
     },(err)=>{
       console.log(err);   
     })
    }else{
      this.commentError=true
      console.log("comments")
    }
 }
 getUserPost(){
  this.postservice.postbyuserid(this.userid).subscribe((res: any) => {
    console.log(res,"post");
    this.userpost = res.data
  })
}
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
   console.log("Editing comment:", edit.value);
   this.postservice.editComment(postid,comment,{comment:edit.value}).subscribe((res)=>{
    console.log(res);
    this.editComments=false
    this.dropdownIndex=null
    this.dropdownReplyIndex=null
    this.commentData=null
    this.editIndex=null
   }) 
 }
 cancelEditComment(){
  this.dropdownReplyIndex=null
  this.commentData=null
  this.editComments=false
  this.dropdownIndex=null
  this.editIndex=null
 }
 deleteComment(postid:any,comment: any) {
   console.log("Deleting comment:", comment);
   this.postservice.deleteComment(postid,comment._id).subscribe((res)=>{
    console.log(res,"deketed");
    this.commentData=null
    this.dropdownIndex=null
    this.dropdownReplyIndex=null
    this.editComments=false
    this.getUserPost()
   },(err)=>{
      console.log(err);
      
   })
 }

 editReplyComment(repid:any,commentid:any,edits:any){
  this.postservice.editReplyComment(this.postData._id,commentid,repid,{comment:edits.value}).subscribe((res)=>{
    console.log(res,"response edioits"); 
    this.getUserPost()
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
  console.log(edits.value,"values")
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
    this.getUserPost()
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
      console.log(result,"result");
      this.editReplyComments=true
      this.replyData=null
      this.dropdownReplyIndex=null
      this.getUserPost()     
  })
}
 replyToComment(comment: any) {
   console.log("Replying to comment:", comment);
 }
}
