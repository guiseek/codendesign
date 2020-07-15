import { CodeAccordionModule } from '@cnd/code/components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DemosRoutingModule } from './demos-routing.module';
import { DemosComponent } from './demos.component';
import { AccordionComponent } from './accordion/accordion.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: DemosComponent }
];

@NgModule({
  declarations: [DemosComponent, AccordionComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    CodeAccordionModule,
    DemosRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class DemosModule { }
