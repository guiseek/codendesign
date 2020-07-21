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
  {
    path: ':selector',
    component: DemosComponent,
    children: children
  },
  {
    path: '**',
    component: DemosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemosRoutingModule {}
