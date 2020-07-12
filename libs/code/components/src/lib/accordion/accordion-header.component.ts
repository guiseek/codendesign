import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'cnd-accordion-header',
  template: `<ng-content select="h1,h2,h3,h4,h5,h6"></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AccordionHeaderComponent {}
