import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { FirebaseRepository, FirestoreRepository } from './infrastructure';
import { DataContext, DataServiceFactory } from './base';
import { HttpClientModule } from '@angular/common/http';

const REPOSITORIES = [
  FirebaseRepository,
  FirestoreRepository,
  DataContext,
  DataServiceFactory,
];

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpClientModule,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders<DataModule> {
    return {
      ngModule: DataModule,
      providers: [...REPOSITORIES],
    };
  }
}
