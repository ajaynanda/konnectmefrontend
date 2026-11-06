import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, of, shareReplay, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:"root"
})
export class UserService{
  userChanged:BehaviorSubject<any>=new BehaviorSubject<any>(null);
  sidebar:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  currenturl:BehaviorSubject<string>=new BehaviorSubject<string>('/user/dashboard');
  private userCache = new Map<string, Observable<any>>();
  constructor(private http:HttpClient){}
  // getUrl(){
  //   return this.currenturl.asObservable()
  // }
  // setUrl(url:string){
  //   return this.currenturl.next(url)
  // }
  // getSideBar(){
  //   return this.sidebar.asObservable()
  // }
  // setSideBar(side:boolean){
  //   return this.sidebar.next(side)
  // }
user(){
  return   this.http.get(`${environment.Alluser}`)
}
userByID(id:any){
  const cacheKey = String(id);
  const cachedUser = this.userCache.get(cacheKey);
  if (cachedUser) {
    return cachedUser;
  }

  const userRequest = this.http.get(`${environment.UserbyId}/${id}`).pipe(
    shareReplay({ bufferSize: 1, refCount: false }),
    catchError((error) => {
      this.userCache.delete(cacheKey);
      return throwError(() => error);
    })
  );
  this.userCache.set(cacheKey, userRequest);
  return userRequest;
}
getUserById(){
  return this.userChanged.asObservable()
}
updateUserById(data:any){
  if (data?._id) {
    this.userCache.set(String(data._id), of({ data }));
  }
  this.userChanged.next(data)
}
updateUser(id:any,data:any){
  return this.http.put(`${environment.Updateuser}/${id}`,data).pipe(
    tap(() => this.invalidateUserCache(id))
  )
}
changePassword(id:any,data:any){
  return this.http.post(`${environment.changePassword}/${id}`,data)
}
userFollow(userid:number,id:number){
  return  this.http.get(`${environment.userFollow}/${userid}/${id}`).pipe(
    tap(() => this.invalidateUserCache(userid, id))
  )
}
userUnfollow(userid:number,id:number){
  return  this.http.get(`${environment.userUnfollow}/${userid}/${id}`).pipe(
    tap(() => this.invalidateUserCache(userid, id))
  )
}
removeFollower(userid:number,follwerid:number){
  return  this.http.delete(`${environment.removeFollower}/${userid}/${follwerid}`).pipe(
    tap(() => this.invalidateUserCache(userid, follwerid))
  )
}
invalidateUserCache(...ids: any[]): void {
   if (ids.length === 0) {
     this.userCache.clear();
     return;
   }
   ids.forEach((id) => this.userCache.delete(String(id)));
}

}