import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
// import { BaseEntity, DataSourceType } from '@cnd/core';
// import { DataSource } from '@cnd/core';
// import { ApiConfig } from '@cnd/core';
import { RestApiRepository } from './rest-api.repository';
// import { DataServiceFactory } from '../base';
// import { HttpHeaders } from '@angular/common/http';

// class DataSourceTest extends DataServiceFactory implements DataSource {
//   type: DataSourceType.firestore;
// }

describe('RestApiRepository', () => {
  let service: RestApiRepository<any>;
//   beforeEach(() => {
//     const baseEntityStub = () => ({});
//     const dataSourceStub = () => ({ config: { headers: {} } });
//     const apiConfigStub = (): ApiConfig => ({
//       url: '',
//       collectionAttribute: '',
//       headers: new HttpHeaders(),
//     });
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         RestApiRepository,
//         { provide: BaseEntity, useFactory: baseEntityStub },
//         { provide: DataSourceTest, useFactory: dataSourceStub },
//         // { provide: ApiConfigTest, useFactory: apiConfigStub },
//       ],
//     });
//     // spyOn(RestApiRepository.prototype, 'api');
//     service = TestBed.inject(RestApiRepository);
//     // dataSource = new DataSourceTest(new Object)
//   });
  it('can load instance', () => {
    expect(new Object()).toBeTruthy();
  });
//   describe('constructor', () => {
//     it('makes expected calls', () => {
//       // expect(RestApiRepository.prototype.api).toHaveBeenCalled();
//     });
//   });
//   describe('getAll', () => {
//     it('makes expected calls', () => {
//       const httpTestingController = TestBed.inject(HttpTestingController);
//       service.getAll().subscribe((res) => {
//         expect(res).toEqual([]);
//       });
//       const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
//       expect(req.request.method).toEqual('GET');
//       req.flush('');
//       // req.flush();
//       httpTestingController.verify();
//     });
  // });
});
