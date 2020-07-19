import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractEntity } from '@cnd/core';
import { Repository, DataSource, ApiConfig } from '@cnd/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RestApiRepository<T extends AbstractEntity>
  implements Repository<AbstractEntity> {

  constructor(private dataSource?: DataSource, private http?: HttpClient) {
  }

  getById(id: string): Observable<AbstractEntity> {
    throw new Error('Method not implemented.');
  }
  getAll(): Observable<Array<AbstractEntity>> {
    throw new Error('Method not implemented.');
  }
  find(): Observable<Array<AbstractEntity>> {
    throw new Error('Method not implemented.');
  }
  create(entity: AbstractEntity): Observable<AbstractEntity> {
    throw new Error('Method not implemented.');
  }
  remove(entity: AbstractEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(entity: AbstractEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
