import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { AccordionComponent } from './accordion.component';
import { AccordionPanelComponent } from './accordion-panel.component';
import { AccordionHeaderComponent } from './accordion-header.component';
import { AccordionButtonDirective } from './accordion-button.directive';

@NgModule({
  declarations: [
    AccordionComponent,
    AccordionPanelComponent,
    AccordionHeaderComponent,
    AccordionButtonDirective,
  ],
  imports: [
    CommonModule,
    MatRippleModule,
    CdkAccordionModule
  ],
  exports: [
    AccordionComponent,
    AccordionPanelComponent,
    AccordionHeaderComponent,
    AccordionButtonDirective,
  ],
})
export class CodeAccordionModule {}
