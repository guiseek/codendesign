// import { TextFieldComponent } from './text-field/text-field.component';
// import { TableComponent } from './table/table.component';
// import { SelectComponent } from './select/select.component';
// import { PopoverComponent } from './popover/popover.component';
// import { FieldComponent } from './field/field.component';
// import { DialogComponent } from './dialog/dialog.component';
// import { AccordionComponent } from './accordion/accordion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemosComponent } from './demos.component';
import { children } from './route-children';

export const routes: Routes = [
  {
    path: '',
    component: DemosComponent,
    children: children
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemosRoutingModule {}
