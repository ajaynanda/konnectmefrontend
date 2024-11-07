import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:"root"
})
export class UserService{
  userChanged:BehaviorSubject<any>=new BehaviorSubject<any>(null)
  constructor(private http:HttpClient){}
user(){
  return   this.http.get(`${environment.Alluser}`)
}
userByID(id:any){
 return  this.http.get(`${environment.UserbyId}/${id}`)
}
getUserById(){
  this.userChanged.asObservable()
}
updateUserById(data:any){
  console.log(data,"observable");
  
  this.userChanged.next(data)
}
updateUser(id:any,data:any){
  return this.http.put(`${environment.Updateuser}/${id}`,data)
}
changePassword(id:any,data:any){
  return this.http.post(`${environment.changePassword}/${id}`,data)
}
userFollow(userid:number,id:number){
 return  this.http.get(`${environment.userFollow}/${userid}/${id}`)
}
userUnfollow(userid:number,id:number){
  return this.http.get(`${environment.userUnfollow}/${userid}/${id}`)
}
removeFollower(userid:number,follwerid:number){
  return this.http.delete(`${environment.removeFollower}/${userid}/${follwerid}`)
}

}