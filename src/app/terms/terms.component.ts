import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-terms',
    templateUrl: './terms.component.html',
    styles: [`
    span{
      font-size:20px;
    }
    h3{
      color:blue;
    }
    h1{
      color:darkred;
    }
  `],
    standalone: false
})
export class TermsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
