import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { CdkAccordion } from '@angular/cdk/accordion';
import { AccordionPanelComponent } from './accordion-panel.component';

@Component({
  selector: 'cnd-accordion',
  template: `<ng-content select="cnd-accordion-panel"></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent extends CdkAccordion {
  @Input() multi = true;

  @ContentChildren(AccordionPanelComponent) panels: QueryList<
    AccordionPanelComponent
  >;
}
