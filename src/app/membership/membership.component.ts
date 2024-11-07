import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styles: [`
  .col-md-7{
    text-align:center;
  }
  .col-md-5{
    text-align:center;
    margin-top:150px;
    padding:20px;
    }
  h2{
    font-size:40px;
    color:blue;
  }
  .card{
    height:450px;
    border:1px solid black;
    border-radius:10px;
    padding:5px;
    margin:10px;
    background-color:azure;
  }
  h4{
    margin:auto;
    margin-bottom:5px;
  }
  h3{
    color:blue;
    text-align:center;
    margin:20px;
  }
  h1{
    color:blue;
  }
  ul{
    text-align:center;   
  }
  li{
    list-style:none;
    margin:10px;
    color:darkred;
  }
  `]
})
export class MembershipComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
