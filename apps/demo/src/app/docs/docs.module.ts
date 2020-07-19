import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { DocsRoutingModule } from './docs-routing.module';
import { DocsComponent } from './docs.component';

@NgModule({
  declarations: [DocsComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    DocsRoutingModule,
    ScullyLibModule,
  ],
})
export class DocsModule {}
