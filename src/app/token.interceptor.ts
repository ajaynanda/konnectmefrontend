import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const commonurl='http://localhost:5000/'
    // const commonurl='https://konnectsmeapi.onrender.com/'
    const token = localStorage.getItem('KMtoken')
    let newRequest=request.clone({
      setHeaders:{'authorization':'Bearer '+token},
      url:commonurl+request.url
    })
    return next.handle(newRequest).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error,"error intercept");     
      return throwError(error)
    }));
  }
}
