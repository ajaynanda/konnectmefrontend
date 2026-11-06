import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './shared/services/loader.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [HeaderComponent, FooterComponent, LoaderComponent, AsyncPipe]
})
export class AppComponent {
  title = 'Konnectme';
  readonly loading$: Observable<boolean>;

  constructor(loaderService: LoaderService) {
    this.loading$ = loaderService.getLoader();
  }
}
