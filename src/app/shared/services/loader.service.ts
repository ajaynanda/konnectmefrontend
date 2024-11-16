import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
loaderState:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false)
  constructor() { }
  getLoader(){
    return this.loaderState.asObservable()
  }
  setLoader(value:boolean){
    this.loaderState.next(value)
  }
}
