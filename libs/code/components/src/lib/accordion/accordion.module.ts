import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { AccordionComponent } from './accordion.component';
import { AccordionPanelComponent } from './accordion-panel.component';
import { AccordionHeaderComponent } from './accordion-header.component';

@NgModule({
  declarations: [
    AccordionComponent,
    AccordionPanelComponent,
    AccordionHeaderComponent,
  ],
  imports: [CommonModule, MatRippleModule, CdkAccordionModule],
  exports: [
    AccordionComponent,
    AccordionPanelComponent,
    AccordionHeaderComponent,
  ],
})
export class CodeAccordionModule {}
