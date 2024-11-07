import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io('http://localhost:5000',);
  public message$: BehaviorSubject<any> = new BehaviorSubject('');
  constructor(private http:HttpClient) { }
  sendMessage(message:any){
    console.log(message,"jkgh");  
    this.socket.emit('message', message);
  }
 getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
  addnewChat(userid:any,repid:any){
    return this.http.post(`${environment.newChat}/${userid}/${repid}`,{})
  }
  chatList(userid:any){
    return this.http.get(`${environment.chatlist}/${userid}`)
  }
  userByID(id:any){
    return  this.http.get(`${environment.UserbyId}/${id}`)
   }
   sendMessages(chatid:any,message:any){
    return this.http.post(`${environment.sendMessage}/${chatid}`,message)
   }
   chatHistory(chatid:any){
    return  this.http.get(`${environment.chathistory}/${chatid}`)
   }
}
