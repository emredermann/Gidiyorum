import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-white rounded-3xl border border-black/[0.05] transition-all duration-300"
      [class.shadow-subtle]="elevated"
      [class.shadow-luxe]="hoverable"
      [class.hover:-translate-y-0.5]="hoverable"
      [class.p-4]="padding === 'normal'"
      [class.p-6]="padding === 'large'"
      [class.p-0]="padding === 'none'"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class UiCardComponent {
  @Input() elevated = true;
  @Input() hoverable = false;
  @Input() padding: 'none' | 'normal' | 'large' = 'normal';
}
