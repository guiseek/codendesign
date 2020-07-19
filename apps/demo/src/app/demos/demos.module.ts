import { ReactiveFormsModule } from '@angular/forms';
import {
  CodeAccordionModule,
  CodeFieldModule,
  CodePopoverModule,
  CodeTextFieldModule,
  CodeTableModule,
  CodeDialogModule,
  CodeSelectModule,
} from '@cnd/code/components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DemosRoutingModule } from './demos-routing.module';
import { DemosComponent } from './demos.component';
import { AccordionComponent } from './accordion/accordion.component';
import { DialogComponent } from './dialog/dialog.component';
import { PopoverComponent } from './popover/popover.component';
import { TableComponent } from './table/table.component';
import { SelectComponent } from './select/select.component';
import { FieldComponent } from './field/field.component';
import { TextFieldComponent } from './text-field/text-field.component';

@NgModule({
  declarations: [
    DemosComponent,
    TableComponent,
    FieldComponent,
    SelectComponent,
    DialogComponent,
    PopoverComponent,
    AccordionComponent,
    TextFieldComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatTabsModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    CodeFieldModule,
    CodeTableModule,
    CodeDialogModule,
    CodeSelectModule,
    CodePopoverModule,
    CodeTextFieldModule,
    CodeAccordionModule,
    ReactiveFormsModule,
    DemosRoutingModule,
  ],
})
export class DemosModule {}
