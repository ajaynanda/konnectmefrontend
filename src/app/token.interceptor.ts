import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    // const commonurl='http://localhost:5000/'
    const commonurl='https://konnectme.onrender.com/'
    const token = localStorage.getItem('KMtoken')
    let newRequest=request.clone({
      setHeaders:{'authorization':'Bearer '+token},
      url:commonurl+request.url
    })
    return next.handle(newRequest);
  }
}
