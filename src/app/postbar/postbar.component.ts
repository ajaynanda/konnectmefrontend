import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { PostService } from '../postService/post.service';
import { DatePipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { EmptyStateComponent } from '../shared/components/empty-state/empty-state.component';
@Component({
    selector: 'app-postbar',
    templateUrl: './postbar.component.html',
    styleUrls: ['./postbar.component.css'],
    imports: [ FormsModule, MatIconButton, DatePipe, EmptyStateComponent]
})
export class PostbarComponent implements OnInit, OnChanges {
  readonly defaultProfileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  currentUser: any = {};

  /** When provided, the component displays these posts instead of fetching the timeline. */
  @Input() userpost: any;
  @Input() emptyStateTitle = 'No Posts Available';
  @Input() emptyStateSubtitle = 'When you or people you follow share something, posts will appear here.';

  @Input() profileUserId: string | number | null = null;
  @Input() savedPostIds: string[] = [];
  @Output() userpostChange = new EventEmitter<any[]>();
  @Output() refreshRequested = new EventEmitter<void>();
  @Output() savedPostIdsChange = new EventEmitter<string[]>();

  /** Whether the component is being used on a profile page (enables delete button). */
  @Input() isProfileMode = false;

feedPost:any

  userid: any;
  commentPost: boolean=false;
  index: any;
  pendingLikes = new Set<string>();
  pendingSaves = new Set<string>();
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
  constructor(private postservice:PostService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
   const user=JSON.parse( localStorage.getItem("KMuser") || '{}')
    this.currentUser = user;
   console.log(user._id);
   this.userid=user._id

   if (this.userpost) {
     // Profile mode: posts are passed in via @Input
     this.feedPost = this.userpost;
   } else {
     // Home feed mode: fetch from timeline
     this.feedPosts();
   }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userpost'] && !changes['userpost'].firstChange) {
      this.feedPost = this.userpost;
    }
  }
  feedPosts(){
    this.postservice.timeline(this.userid).subscribe((res:any)=>{
      console.log(res.data);
      this.feedPost=res.data
      this.changeDetector.markForCheck();
     })
  }
  toggle(id:any){
    const postId = String(id);
    if (this.pendingLikes.has(postId)) {
      return;
    }

    this.pendingLikes.add(postId);
    this.postservice.like(this.userid,id).subscribe({
      next: () => this.refreshPosts(),
      error: (err) => {
        console.error(err);
        this.pendingLikes.delete(postId);
        this.changeDetector.markForCheck();
      },
      complete: () => {
        this.pendingLikes.delete(postId);
        this.changeDetector.markForCheck();
      }
    });
  }

  isLikedByCurrentUser(post: any): boolean {
    return (post.Likes || []).some((like: any) => String(like.userid) === String(this.userid));
  }

  isSaved(post: any): boolean {
    return this.savedPostIds.includes(String(post._id));
  }

  toggleSaved(post: any): void {
    const postId = String(post._id);
    if (this.pendingSaves.has(postId)) {
      return;
    }

    this.pendingSaves.add(postId);
    const request = this.isSaved(post)
      ? this.postservice.unsavePost(this.userid, postId)
      : this.postservice.savePost(this.userid, postId);
    request.subscribe({
      next: () => {
        this.savedPostIds = this.isSaved(post)
          ? this.savedPostIds.filter((savedId) => savedId !== postId)
          : [...this.savedPostIds, postId];
        this.savedPostIdsChange.emit(this.savedPostIds);
        this.pendingSaves.delete(postId);
        this.changeDetector.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.pendingSaves.delete(postId);
        this.changeDetector.markForCheck();
      }
    });
  }

  refreshPosts(): void {
    if (this.isProfileMode && this.profileUserId !== null) {
      this.refreshRequested.emit();
      return;
    }

    this.feedPosts();
  }
commentArray(comments:NgForm,postid:number){
  const text = comments.value.comment?.trim();
  if (!text) {
    this.commentError = true;
    return;
  }

  this.commentError = false;
  this.postservice.comment(this.userid,postid,{
    ...comments.value,
    comment: text,
    Name: this.currentUser.Name || `${this.currentUser.Firstname || ''} ${this.currentUser.Lastname || ''}`.trim(),
    profileImg: this.currentUser.Profilepic || ''
  }).subscribe({
    next: () => {
      comments.resetForm();
      this.refreshPosts();
    },
    error: (err) => console.log(err)
  });
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
    this.refreshPosts()
   },(err)=>{
      console.log(err);
      
   })
 }

 editReplyComment(repid:any,commentid:any,edits:any){
  this.postservice.editReplyComment(this.postData._id,commentid,repid,{comment:edits.value}).subscribe((res)=>{
    // console.log(res,"response edioits"); 
    this.refreshPosts()
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
    this.refreshPosts()
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
      this.refreshPosts()
  })
}
 replyToComment(comment: any) {
   console.log("Replying to comment:", comment);
 }

 deletePost(post: any) {
   this.postservice.deletePost(post._id).subscribe({
     next: () => {
       this.refreshPosts();
     },
     error: (err) => console.log(err)
   });
 }
}
