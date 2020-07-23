import { ReactiveFormsModule } from '@angular/forms';
import {
  CodeAccordionModule,
  CodeFieldModule,
  CodePopoverModule,
  CodeTextFieldModule,
  CodeTableModule,
  CodeDialogModule,
  CodeSelectModule,
  CodeStepperModule,
  CodeUploadModule
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
import { ScullyLibModule } from '@scullyio/ng-lib';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StepperComponent } from './stepper/stepper.component';
import { UploadComponent } from './upload/upload.component';

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
    StepperComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatTabsModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    CodeFieldModule,
    CodeTableModule,
    CodeDialogModule,
    CodeSelectModule,
    CodeUploadModule,
    CodeStepperModule,
    CodePopoverModule,
    CodeTextFieldModule,
    CodeAccordionModule,
    ReactiveFormsModule,
    DemosRoutingModule,
    ScullyLibModule
  ],
})
export class DemosModule {}
