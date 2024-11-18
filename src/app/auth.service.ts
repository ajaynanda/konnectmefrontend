import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
headerState:BehaviorSubject<string>=new BehaviorSubject<string>('home')
  constructor(private http:HttpClient) { }
  getHeaderState(){
    return this.headerState.asObservable()
  }
  setHeaderState(state:string){
    this.headerState.next(state)
  }
  Login(data:any){
  return this.http.post(`${environment.Login}`,data)
  }
  Alluser(){
  return   this.http.get(`${environment.Alluser}`)
  }
  Register(data:any){
   return  this.http.post(`${environment.Register}`,data)
  }
  forgotPassword(email:any){
    return this.http.post(`${environment.forgotPassword}`,email)
  }
  sendEmail(data:any){
    return this.http.post<any>(`${environment.sendEmail}`,data)
  }
}
