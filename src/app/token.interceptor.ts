import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoaderService } from './shared/services/loader.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private readonly loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    // const commonurl='http://localhost:5000/'
    const commonurl='https://konnectsmeapi.onrender.com/'
    const token = localStorage.getItem('KMtoken')
    let newRequest=request.clone({
      setHeaders:{'authorization':'Bearer '+token},
      url:commonurl+request.url
    })
    this.loaderService.beginRequest();
    return next.handle(newRequest).pipe(
      catchError((error:HttpErrorResponse)=>{
        console.log(error,"error intercept");
        return throwError(() => error);
      }),
      finalize(() => this.loaderService.endRequest())
    );
  }
}
