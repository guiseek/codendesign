import { Directive } from '@angular/core';

@Directive({
  selector: `
    cndAccordionHeader
    cnd-accordion-header,
    [cndAccordionHeader],
    [cnd-accordion-header]
  `,
})
export class AccordionHeaderComponent {}
