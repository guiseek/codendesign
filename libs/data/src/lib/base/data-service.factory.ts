import { RestApiRepository } from './../infrastructure/rest-api.repository';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BaseEntity,
  FirebaseEntity,
  Repository,
  DataSource,
  DataSourceType,
} from '@cnd/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreRepository } from '../infrastructure/firestore.repository';
import { FirebaseRepository } from '../infrastructure/firebase.repository';

@Injectable()
export class DataServiceFactory {
  constructor(
    private http: HttpClient,
    private afdb: AngularFireDatabase,
    private fb?: FirebaseApp,
    private afs?: AngularFirestore
  ) {}

  create(
    entity: BaseEntity,
    dataSource: DataSource
  ): Repository<BaseEntity> | undefined {
    return this.getDataSource(dataSource, entity);
  }

  getDataSource({ type }: DataSource, entity: BaseEntity) {
    switch (type) {
      case DataSourceType.firebase: {
        return new FirebaseRepository(entity as FirebaseEntity, this.afdb);
      }

      case DataSourceType.rest: {
        return;
      }

      case DataSourceType.firestore: {
        return new FirestoreRepository(entity as FirebaseEntity, this.afs);
      }
    }
  }
  /**
   * @todo concluir factory http
   * para rest apis
   *
   * @param {DataSource} datasource
   * @returns {*}
   * @memberof DataServiceFactory
   */
  createCustom(dataSource: DataSource): any {
    return new RestApiRepository(dataSource, this.http);
  }
}
