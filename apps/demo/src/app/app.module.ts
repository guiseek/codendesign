import { CodeAccordionModule, CodeFieldModule, CodePopoverModule, CodeTextFieldModule, CodeTableModule } from '@cnd/code/components';
import { DataModule } from '@cnd/data';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { firebaseConfig } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot([{ path: 'docs', loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule) }]),
    DataModule,
    MatCardModule,
    CodeTableModule,
    CodeFieldModule,
    CodeTextFieldModule,
    CodePopoverModule,
    CodeAccordionModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ScullyLibModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
