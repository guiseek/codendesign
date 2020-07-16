import { CdkAccordionItem } from '@angular/cdk/accordion';
import { Directive, Input, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: `
    cndAccordionButton
    cnd-accordion-button
    [cndAccordionButton],
    [cnd-accordion-button]
  `
})
export class AccordionButtonDirective extends CdkAccordionItem {
  @Input()
  @HostBinding('attr.aria-expanded')
  expanded: boolean;

  @HostBinding('attr.id')
  id: string;

  @HostBinding('attr.aria-controls')
  controls: string;

  @Input() disabled: boolean;

  @HostListener('click')
  onClick() {
    this.toggle();
  }
}
