import { ApiConfig, EntityServiceConfig, CustomServiceConfig } from './config.interfaces';
import { AbstractEntity } from '../abstractions/abstract-entity.model';

export interface DataSource {
  config?: ApiConfig;
  type: DataSourceType;
  entities?: Array<EntityServiceConfig> | Array<AbstractEntity>;
  services?: Array<CustomServiceConfig>;
}


export enum DataSourceType {
  firebase,
  firestore,
  rest,
}
