import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {
@Input() loaderState:any
  constructor(private cf:ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log(this.loaderState,"uyhgh");
    this.cf.detectChanges()
  }

}
