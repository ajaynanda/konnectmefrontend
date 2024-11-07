import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
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
}
