import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject, Observable, catchError, shareReplay, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user/user.service';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io(environment.socketUrl);
  public message$: BehaviorSubject<any> = new BehaviorSubject('');
  private chatListCache = new Map<string, Observable<any>>();
  private chatHistoryCache = new Map<string, Observable<any>>();

  constructor(private http: HttpClient, private userService: UserService) {
    this.socket.on('message', (message) => {
      this.invalidateChatCaches();
      this.userService.invalidateUserCache(
        message?.userid,
        message?.reciepientID,
        message?.recipientID
      );
      this.message$.next(message);
    });
  }
  sendMessage(message:any){
    console.log(message,"jkgh");  
    this.socket.emit('message', message);
  }
 getNewMessage = () => {
    return this.message$.asObservable();
  };
  addnewChat(userid:any,repid:any){
    return this.http.post(`${environment.newChat}/${userid}/${repid}`,{}).pipe(
      tap(() => this.invalidateAfterChatChange(userid, repid))
    )
  }
  chatList(userid:any){
    const cacheKey = String(userid);
    const cachedList = this.chatListCache.get(cacheKey);
    if (cachedList) {
      return cachedList;
    }

    const chatListRequest = this.http.get(`${environment.chatlist}/${userid}`).pipe(
      shareReplay({ bufferSize: 1, refCount: false }),
      catchError((error) => {
        this.chatListCache.delete(cacheKey);
        return throwError(() => error);
      })
    );
    this.chatListCache.set(cacheKey, chatListRequest);
    return chatListRequest;
  }
  userByID(id:any){
    return this.userService.userByID(id)
   }
   sendMessages(chatid:any,message:any,userid?:any,recipientid?:any){
    return this.http.post(`${environment.sendMessage}/${chatid}`,message).pipe(
      tap(() => {
        this.invalidateChatHistory(chatid);
        this.userService.invalidateUserCache(userid, recipientid);
      })
    )
   }
   chatHistory(chatid:any){
    const cacheKey = String(chatid);
    const cachedHistory = this.chatHistoryCache.get(cacheKey);
    if (cachedHistory) {
      return cachedHistory;
    }

    const chatHistoryRequest = this.http.get(`${environment.chathistory}/${chatid}`).pipe(
      shareReplay({ bufferSize: 1, refCount: false }),
      catchError((error) => {
        this.chatHistoryCache.delete(cacheKey);
        return throwError(() => error);
      })
    );
    this.chatHistoryCache.set(cacheKey, chatHistoryRequest);
    return chatHistoryRequest;
   }

  private invalidateChatHistory(chatid:any): void {
    this.chatHistoryCache.delete(String(chatid));
    this.chatListCache.clear();
  }

  private invalidateAfterChatChange(userid:any, recipientid:any): void {
    this.invalidateChatCaches();
    this.userService.invalidateUserCache(userid, recipientid);
  }

  private invalidateChatCaches(): void {
    this.chatListCache.clear();
    this.chatHistoryCache.clear();
   }
}
