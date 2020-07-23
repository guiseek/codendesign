import { UploadComponent } from './upload/upload.component';
import { StepperComponent } from './stepper/stepper.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { TableComponent } from './table/table.component';
import { SelectComponent } from './select/select.component';
import { PopoverComponent } from './popover/popover.component';
import { FieldComponent } from './field/field.component';
import { DialogComponent } from './dialog/dialog.component';
import { AccordionComponent } from './accordion/accordion.component';
import { Routes } from '@angular/router';

export const children: Routes = [
  {
    path: 'accordion',
    component: AccordionComponent,
  },
  {
    path: 'dialog',
    component: DialogComponent,
  },
  {
    path: 'field',
    component: FieldComponent,
  },
  {
    path: 'popover',
    component: PopoverComponent,
  },
  {
    path: 'stepper',
    component: StepperComponent,
  },
  {
    path: 'select',
    component: SelectComponent,
  },
  {
    path: 'table',
    component: TableComponent,
  },
  {
    path: 'text-field',
    component: TextFieldComponent,
  },
  {
    path: 'upload',
    component: UploadComponent,
  },
];
