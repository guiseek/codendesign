import {
  CodeAccordionModule,
  CodeFieldModule,
  CodePopoverModule,
  CodeTextFieldModule,
  CodeTableModule,
  CodeDialogModule,
} from '@cnd/code/components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemosRoutingModule } from './demos-routing.module';
import { DemosComponent } from './demos.component';
import { AccordionComponent } from './accordion/accordion.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from './dialog/dialog.component';
import { PopoverComponent } from './popover/popover.component';
import { TableComponent } from './table/table.component';
import { SelectComponent } from './select/select.component';
import { FieldComponent } from './field/field.component';
import { TextFieldComponent } from './text-field/text-field.component';

@NgModule({
  declarations: [
    DemosComponent,
    AccordionComponent,
    DialogComponent,
    PopoverComponent,
    TableComponent,
    SelectComponent,
    FieldComponent,
    TextFieldComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    CodeDialogModule,
    CodeAccordionModule,
    CodeFieldModule,
    CodePopoverModule,
    CodeTextFieldModule,
    CodeTableModule,
    DemosRoutingModule,
  ],
})
export class DemosModule {}
