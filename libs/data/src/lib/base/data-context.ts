import { DataServiceFactory } from './data-service.factory';
import { DataSource, AbstractEntity } from '@cnd/core';
import { Injectable } from '@angular/core';

@Injectable()
export class DataContext {
  dataSources: Array<DataSource>;

  constructor(private serviceFactory: DataServiceFactory) {}

  initialize(): void {
    if (this.dataSources !== undefined) {
      this.dataSources.forEach((dataSource) => {
        if (
          dataSource.entities !== undefined &&
          Array.isArray(dataSource.entities)
        ) {
          for (const item of dataSource.entities) {
            let entity: AbstractEntity;
           let target: string;

            if (item instanceof AbstractEntity) {
              entity = item as AbstractEntity;
              target = entity['$$name'];
            } else {
              entity = item.entity;
              target = item.name !== undefined ? item.name : entity['$$name'];
            }

            this[target] = this.serviceFactory.create(entity, dataSource);
          }
        }

        if (
          dataSource.services !== undefined &&
          Array.isArray(dataSource.services)
        ) {
          dataSource.services.forEach((config) => {
            this[config.name] = this.serviceFactory.createCustom(dataSource);
          });
        }
      });
    }
  }
}
