import { Injectable } from '@angular/core';
import { FirebaseEntity, Repository } from '@cnd/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { of, Observable } from 'rxjs';
import { FirebaseQuery } from '../models/firebase-query';

@Injectable()
export class FirestoreRepository<T extends FirebaseEntity>
  implements Repository<FirebaseEntity> {
  collectionName: string;

  constructor(public entity: FirebaseEntity, private afs: AngularFirestore) {
    this.collectionName = entity.entityName;
  }

  getById(id: string) {
    return this.afs
      .doc<T>(`${this.entity.name}/${id}`)
      .valueChanges()
      .pipe(map(this.handleEntityResponse));
  }

  getAll(): Observable<Array<T>> {
    return this.afs
      .collection<T>(this.collectionName)
      .valueChanges({ idField: 'id' });
  }

  query(query: FirebaseQuery): Observable<Array<FirebaseEntity>> {
    return this.afs
      .collection<FirebaseEntity>(this.collectionName, (ref) => query.exec(ref))
      .valueChanges();
  }

  find(): Observable<Array<FirebaseEntity>> {
    throw new Error('Method not implemented.');
  }

  create(entity: FirebaseEntity) {
    if (!entity) return of<T>();

    const entityToSave = { ...entity.serialize() };
    entityToSave.id = this.afs.createId();
    this.afs
      .collection(this.collectionName)
      .doc(entityToSave.id)
      .set(entityToSave);
  }

  remove(entity: FirebaseEntity): Promise<void> {
    if (!entity) return Promise.resolve(undefined);

    return this.afs
      .collection<FirebaseEntity>(this.collectionName)
      .doc(entity.id)
      .delete();
  }

  update(entity: FirebaseEntity): Promise<void> {
    return this.afs
      .collection<FirebaseEntity>(this.entity.entityName)
      .doc(entity.id)
      .set(entity, { merge: true });
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
