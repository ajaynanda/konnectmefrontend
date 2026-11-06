import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-empty-state',
    templateUrl: './empty-state.component.html',
    styleUrls: ['./empty-state.component.css'],
    standalone: true
})
export class EmptyStateComponent {
  /** The icon class to display (Bootstrap Icons). Defaults to a generic empty icon. */
  @Input() icon = 'bi-inbox';

  /** Main heading text, e.g. "No Posts Available" */
  @Input() title = 'Nothing here yet';

  /** Subtitle / description text shown below the title */
  @Input() subtitle = '';

  /** Optional action button label. If empty, no button is shown. */
  @Input() actionLabel = '';

  /** Size variant: 'sm' for compact inline use, 'md' (default) for standard blocks */
  @Input() size: 'sm' | 'md' = 'md';
}
