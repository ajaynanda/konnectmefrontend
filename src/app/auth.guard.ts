import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token=localStorage.getItem('KMtoken')
      if(token){
        return  true
      }else{
        this.router.navigate(['/login'])
        return false
      }
  }
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard2  {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token=localStorage.getItem('KMtoken')
      if(!token){       
        return  true
      }else{
        this.router.navigate(['/user/dashboard'])
        return false
      }
  }
  
}