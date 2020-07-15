import { AccordionComponent } from './accordion/accordion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemosComponent } from './demos.component';

const routes: Routes = [
  {
    path: '',
    component: DemosComponent,
  },
  {
    path: 'accordion',
    component: AccordionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemosRoutingModule {}
