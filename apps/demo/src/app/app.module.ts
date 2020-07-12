import { DataModule } from '@cnd/data';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { firebaseConfig } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    DataModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
