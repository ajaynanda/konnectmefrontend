import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private readonly loaderState = new BehaviorSubject<boolean>(false);
  private activeRequests = 0;

  constructor() {}

  getLoader(){
    return this.loaderState.asObservable()
  }

  beginRequest(): void {
    this.activeRequests += 1;
    this.loaderState.next(true);
  }

  endRequest(): void {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    this.loaderState.next(this.activeRequests > 0);
  }
}
