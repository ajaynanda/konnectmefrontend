import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  // postUpdate=new Subject<any>()
  // userUpdate=new Subject<any>()
  // liked=new Subject<any>()
  constructor(private http:HttpClient) { }
  timeline(userid:any){
   return  this.http.get(`${environment.timeline}/${userid}`)
  }
  like(userid:any,id:any){
   return  this.http.get(`${environment.like}/${userid}/${id}`) 
  }
  postbyuserid(id:any){
    return this.http.get(`${environment.postbyuserid}/${id}`)
  }
  createpost(id:number,postData:any){
  return   this.http.post(`${environment.createPost}/${id}`,postData)
  }
  comment(userid:number,id:number,commentData:any){
   return  this.http.post(`${environment.commentPost}/${userid}/${id}`,commentData)
  }
  editComment(postid:number,commentid:number,data:any){
    return this.http.put(`${environment.commentEdit}/${postid}/${commentid}`,data)
  }
  deleteComment(postid:number,commentid:number){
    return this.http.delete(`${environment.commentDelete}/${postid}/${commentid}`)
  }
  addReplyComment(postid:number,commentid:number,data:any){
    return this.http.post(`${environment.addreply}/${postid}/${commentid}`,data)
  }
  editReplyComment(postid:number,commentid:number,repid:number,data:any){
   return  this.http.put(`${environment.editReply}/${postid}/${commentid}/${repid}`,data)
  }
  deleteReplyComment(postid:number,commentid:number,repid:number){
   return this.http.delete(`${environment.deleteReply}/${postid}/${commentid}/${repid}`)
  }
}
