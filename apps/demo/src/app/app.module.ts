import {
  CodeAccordionModule,
  CodeFieldModule,
  CodePopoverModule,
  CodeTextFieldModule,
  CodeTableModule,
} from '@cnd/code/components';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { firebaseConfig } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { OverviewComponent } from './overview/overview.component';

const routeConfig: Routes = [
  {
    path: '',
    component: OverviewComponent
  },
  {
    path: 'components',
    loadChildren: () =>
      import('./demos/demos.module').then((m) => m.DemosModule),
  },
  {
    path: 'docs',
    loadChildren: () =>
      import('./docs/docs.module').then((m) => m.DocsModule),
  },
];

@NgModule({
  declarations: [AppComponent, OverviewComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeConfig),
    AngularFireModule.initializeApp(firebaseConfig),
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    CodeTableModule,
    CodeFieldModule,
    CodeTextFieldModule,
    CodePopoverModule,
    CodeAccordionModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ScullyLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
