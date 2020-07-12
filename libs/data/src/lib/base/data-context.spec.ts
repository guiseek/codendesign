import { TestBed } from '@angular/core/testing';
import { DataServiceFactory } from './data-service.factory';
import { DataContext } from './data-context';
import { Attribute, Entity, FirebaseEntity, DataSourceType } from '@cnd/core';

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
  beforeEach(() => {
    const dataServiceFactoryStub = () => ({
      create: (entity, dataSource) => ({}),
      createCustom: (dataSource) => ({}),
    });
    TestBed.configureTestingModule({
      providers: [
        DataContext,
        { provide: DataServiceFactory, useFactory: dataServiceFactoryStub },
      ],
    });
    service = TestBed.inject(DataContext);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('initialize', () => {
    it('makes expected calls', () => {
      const dataServiceFactoryStub: DataServiceFactory = TestBed.inject(
        DataServiceFactory
      );
      service.dataSources = [
        {
          type: DataSourceType.firebase,
          entities: [new User()],
          services: [],
        },
      ];

      spyOn(dataServiceFactoryStub, 'create').and.callThrough();
      // spyOn(dataServiceFactoryStub, 'createCustom').and.callThrough();

      service.initialize();
      expect(dataServiceFactoryStub.create).toHaveBeenCalled();
      // expect(dataServiceFactoryStub.createCustom).toHaveBeenCalled();
    });
  });
});
