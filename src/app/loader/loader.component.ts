import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  @Input() loaderState = false;
}
