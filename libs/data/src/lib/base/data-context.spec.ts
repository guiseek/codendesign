import { FirebaseRepository } from './../infrastructure/firebase.repository';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataServiceFactory } from './data-service.factory';
import { DataContext } from './data-context';
import { Attribute, Entity, DataSourceType, DataSource } from '@cnd/core';
import { FirebaseEntity } from '@cnd/domain';
import { createMockFor } from '@cnd/util/testing';
import { HttpClient } from '@angular/common/http';
import { FirebaseApp } from '@angular/fire';

@Entity('users')
export class User extends FirebaseEntity {
  @Attribute() displayName: string;
  @Attribute() photoURL: string;
  @Attribute() nickname: string;
  @Attribute() status: string;
  @Attribute() email: string;
  @Attribute() uid: string;
}


describe('DataContext', () => {
  let service: DataContext;

  function createDataService({
    httpMock = createMockFor(HttpClient),
    afdbMock = createMockFor(AngularFireDatabase),
    fbMock = createMockFor(FirebaseApp),
    afsMock = createMockFor(AngularFirestore),
  } = {}) {
    return { httpMock, afdbMock, fbMock, afsMock };
  }

  function createDataContext({
    dataServiceMock = new DataServiceFactory(
      createDataService().httpMock,
      createDataService().afdbMock,
      createDataService().fbMock,
      createDataService().afsMock
    ),
  } = {}) {
    const dataContextMock = new DataContext(dataServiceMock);
    const dataSourcesMock = [
      {
        type: DataSourceType.firebase,
        entities: [new User()],
        services: [],
      },
    ];
    dataContextMock.dataSources = dataSourcesMock;

    return { dataServiceMock, dataSourcesMock, dataContextMock };
  }

  service = createDataContext().dataContextMock;

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('initialize', () => {

    let dataService: DataServiceFactory;
    let dataContext: DataContext;
    let dataSources: DataSource[];
    beforeEach(() => {
      const { dataServiceMock, dataContextMock, dataSourcesMock } = createDataContext();
      dataService = dataServiceMock;
      dataContext = dataContextMock;
      dataSources = dataSourcesMock;
    });

    it('should call the create method when initializing', () => {
      spyOn(dataService, 'create').and.callThrough();
      dataContext.initialize();

      expect(dataService.create).toHaveBeenCalled();
    });

    it('should call the getDataSource method when initializing', () => {
      spyOn(dataService, 'getDataSource').and.callThrough();
      dataContext.initialize();
      expect(dataService.getDataSource).toHaveBeenCalled();
    });

    it('must be Firebase Repository when passing firebase type', () => {
      const userRepository = dataService.create(new User, dataSources.shift());
      expect(userRepository).toBeInstanceOf(FirebaseRepository);
    })
  });
});
