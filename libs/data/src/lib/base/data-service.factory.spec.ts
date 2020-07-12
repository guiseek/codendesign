import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BaseEntity, DataSource, DataSourceType } from '@cnd/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataServiceFactory } from './data-service.factory';

class DataSourceTest extends DataServiceFactory implements DataSource {
  type: DataSourceType.firestore;
  getDataSource;
}

describe('DataServiceFactory', () => {
  let service: DataServiceFactory;

  beforeEach(() => {
    const baseEntityStub = () => ({});
    const dataSourceStub = () => ({});
    const firebaseAppStub = () => ({});
    const angularFireDatabaseStub = () => ({});
    const angularFirestoreStub = () => ({});
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DataServiceFactory,
        { provide: BaseEntity, useFactory: baseEntityStub },
        { provide: DataSourceTest, useFactory: dataSourceStub },
        { provide: FirebaseApp, useFactory: firebaseAppStub },
        { provide: AngularFireDatabase, useFactory: angularFireDatabaseStub },
        { provide: AngularFirestore, useFactory: angularFirestoreStub },
      ],
    });
    service = TestBed.inject(DataServiceFactory);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('create', () => {
    it('makes expected calls', () => {
      const baseEntityStub: BaseEntity = TestBed.inject(BaseEntity);
      const dataSourceStub: DataSourceTest = TestBed.inject(DataSourceTest);

      spyOn(service, 'getDataSource');

      service.create(baseEntityStub, dataSourceStub);
      expect(service.getDataSource).toHaveBeenCalled();
    });
  });
});
