import { Observable } from 'rxjs';

import { AbstractEntity } from '../abstractions/abstract-entity.model';

export interface Repository<T extends AbstractEntity> {
  getById(id: string): Observable<T>;

  getAll(): Observable<Array<T>>;

  find(): Observable<Array<T>>;

  query?(args?: any): Observable<Array<T>>;

  create(entity: T): Observable<T>;

  remove(entity: T): Promise<void>;

  update(entity: T): Promise<void>;
}
