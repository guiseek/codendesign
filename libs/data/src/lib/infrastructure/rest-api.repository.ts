import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseEntity, Repository, DataSource, ApiConfig } from '@cnd/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RestApiRepository<T extends BaseEntity>
  implements Repository<BaseEntity> {

  constructor(private dataSource?: DataSource, private http?: HttpClient) {
  }

  getById(id: string): Observable<BaseEntity> {
    throw new Error('Method not implemented.');
  }
  getAll(): Observable<Array<BaseEntity>> {
    throw new Error('Method not implemented.');
  }
  find(): Observable<Array<BaseEntity>> {
    throw new Error('Method not implemented.');
  }
  create(entity: BaseEntity): Observable<BaseEntity> {
    throw new Error('Method not implemented.');
  }
  remove(entity: BaseEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(entity: BaseEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
