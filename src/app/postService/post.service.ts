import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, shareReplay, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private userPostsCache = new Map<string, Observable<any>>();
  private timelineCache = new Map<string, Observable<any>>();
  // postUpdate=new Subject<any>()
  // userUpdate=new Subject<any>()
  // liked=new Subject<any>()
  constructor(private http:HttpClient) { }
  timeline(userid:any){
    const cacheKey = String(userid);
    const cachedTimeline = this.timelineCache.get(cacheKey);
    if (cachedTimeline) {
      return cachedTimeline;
    }

    const timelineRequest = this.http.get(`${environment.timeline}/${userid}`).pipe(
      shareReplay({ bufferSize: 1, refCount: false }),
      catchError((error) => {
        this.timelineCache.delete(cacheKey);
        return throwError(() => error);
      })
    );
    this.timelineCache.set(cacheKey, timelineRequest);
    return timelineRequest;
  }
  like(userid:any,id:any){
   return this.http.get(`${environment.like}/${userid}/${id}`).pipe(
     tap(() => this.invalidateUserPostsCache())
   )
  }
  postbyuserid(id:any){
    const cacheKey = String(id);
    const cachedPosts = this.userPostsCache.get(cacheKey);
    if (cachedPosts) {
      return cachedPosts;
    }

    const postsRequest = this.http.get(`${environment.postbyuserid}/${id}`).pipe(
      shareReplay({ bufferSize: 1, refCount: false }),
      catchError((error) => {
        this.userPostsCache.delete(cacheKey);
        return throwError(() => error);
      })
    );
    this.userPostsCache.set(cacheKey, postsRequest);
    return postsRequest;
  }
  likedPosts(userid:any){
    return this.http.get(`${environment.likedPosts}/${userid}`);
  }
  savedPosts(userid:any){
    return this.http.get(`${environment.savedPosts}/${userid}`);
  }
  savePost(userid:any,postid:any){
    return this.http.post(`${environment.savePost}/${userid}/${postid}`,{});
  }
  unsavePost(userid:any,postid:any){
    return this.http.delete(`${environment.unsavePost}/${userid}/${postid}`);
  }
  createpost(id:number,postData:any){
  return this.http.post(`${environment.createPost}/${id}`,postData).pipe(
    tap(() => this.invalidateUserPostsCache())
  )
  }
  deletePost(id:number){
    return this.http.delete(`${environment.deletePost}/${id}`).pipe(
      tap(() => this.invalidateUserPostsCache())
    )
  }
  comment(userid:number,id:number,commentData:any){
   return this.http.post(`${environment.commentPost}/${userid}/${id}`,commentData).pipe(
     tap(() => this.invalidateUserPostsCache())
   )
  }
  editComment(postid:number,commentid:number,data:any){
    return this.http.put(`${environment.commentEdit}/${postid}/${commentid}`,data).pipe(
      tap(() => this.invalidateUserPostsCache())
    )
  }
  deleteComment(postid:number,commentid:number){
    return this.http.delete(`${environment.commentDelete}/${postid}/${commentid}`).pipe(
      tap(() => this.invalidateUserPostsCache())
    )
  }
  addReplyComment(postid:number,commentid:number,data:any){
    return this.http.post(`${environment.addreply}/${postid}/${commentid}`,data).pipe(
      tap(() => this.invalidateUserPostsCache())
    )
  }
  editReplyComment(postid:number,commentid:number,repid:number,data:any){
   return this.http.put(`${environment.editReply}/${postid}/${commentid}/${repid}`,data).pipe(
     tap(() => this.invalidateUserPostsCache())
   )
  }
  deleteReplyComment(postid:number,commentid:number,repid:number){
   return this.http.delete(`${environment.deleteReply}/${postid}/${commentid}/${repid}`).pipe(
     tap(() => this.invalidateUserPostsCache())
   )
  }

  invalidateUserPostsCache(): void {
    this.userPostsCache.clear();
    this.timelineCache.clear();
  }
}
