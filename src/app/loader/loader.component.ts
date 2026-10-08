import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatProgressSpinner]
})
export class LoaderComponent implements OnInit {
@Input() loaderState:any
  constructor(private cf:ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log(this.loaderState,"uyhgh");
    this.cf.detectChanges()
  }

}
