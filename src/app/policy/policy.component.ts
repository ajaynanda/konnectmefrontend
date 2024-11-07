import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styles: [`
    h1{
      color:darkred;
      margin:30px ;
      text-align:center;
    }
    h3{
      color:blue;
      text-align:center;
      margin:10px;
    }
    p{
      color:blue;
      font-size:20px;
    }
  `]
})
export class PolicyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
