import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { CdkAccordion } from '@angular/cdk/accordion';

@Component({
  selector: 'cnd-accordion, [cnd-accordion]',
  template: `<ng-content select="cnd-accordion-panel"></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent extends CdkAccordion {
  @Input() multi = true;
}
