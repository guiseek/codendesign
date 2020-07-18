import { ApiConfig, EntityServiceConfig, CustomServiceConfig } from './config.interfaces';
import { BaseEntity } from '@cnd/domain';

export interface DataSource {
  config?: ApiConfig;
  type: DataSourceType;
  entities?: Array<EntityServiceConfig> | Array<BaseEntity>;
  services?: Array<CustomServiceConfig>;
}


export enum DataSourceType {
  firebase,
  firestore,
  rest,
}
