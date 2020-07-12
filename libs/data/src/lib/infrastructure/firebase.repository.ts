import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseEntity, Repository } from '@cnd/core';

@Injectable()
export class FirebaseRepository<T extends FirebaseEntity>
  implements Repository<FirebaseEntity> {
  sdkDb: any;
  afdb: AngularFireDatabase;
  itemsRef: AngularFireList<T>;

  constructor(
    public entity: FirebaseEntity,
    afdb?: AngularFireDatabase,
    fb?: FirebaseApp
  ) {
    if (afdb !== undefined) {
      this.itemsRef = afdb.list(`${this.entity.entityName}`);
      this.afdb = afdb;
    }

    if (fb !== undefined) this.sdkDb = fb.database().ref('/');
  }

  getById(id: string): Observable<T> {
    return this.afdb
      .object(`${this.entity.entityName}/${id}`)
      .valueChanges()
      .pipe(map(this.handleEntityResponse));
  }

  getAll(): Observable<Array<T>> {
    return this.afdb
      .list(this.entity.entityName)
      .valueChanges()
      .pipe(map(this.handleCollectionResponse));
  }

  find(): Observable<Array<T>> {
    throw new Error('Method not implemented.');
  }

  remove(entity: FirebaseEntity): Promise<void> {
    if (!entity) return Promise.resolve(undefined);

    return this.afdb.list(`${entity.entityName}`).remove(entity.id);
  }

  update(entity: FirebaseEntity): Promise<void> {
    if (!entity) return Promise.resolve(undefined);

    return this.afdb
      .list(entity.entityName)
      .update(entity.id, { ...entity.serialize() });
  }

  create(entity: FirebaseEntity): Observable<T> {
    if (!entity) return of<T>();
    // to keep track of ids

    const dataToSave: any = {};
    const newKey = this.sdkDb.child(entity.entityName).push().key;
    const entityToSave = { ...entity.serialize() };
    entityToSave.id = newKey;

    dataToSave[`${entity.entityName}/${newKey}`] = entityToSave;

    return this.saveData(dataToSave);
  }

  private saveData(data: any): Observable<T> {
    const subject = new Subject<T>();

    this.sdkDb.update(data).then(
      (val: any) => {
        subject.next(val);
        subject.complete();
      },
      (err: any) => {
        subject.error(err);
        subject.complete();
      }
    );

    return subject.asObservable();
  }

  private handleEntityResponse = (data: any): T => {
    let result: T;

    const target = _.cloneDeep(this.entity) as T;
    target.deserialize(data);
    result = target;

    return result;
  };

  private handleCollectionResponse = (data: any): Array<T> => {
    let result: Array<T> = [];
    if (Array.isArray(data)) {
      const collection: Array<T> = [];

      data.forEach((item: any) => {
        const target = _.cloneDeep(this.entity) as T;
        target.deserialize(item);
        collection.push(target);
      });

      result = collection;
    }

    return result;
  };
}
