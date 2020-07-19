import { AbstractEntity } from '@cnd/core';

export class FirebaseEntity extends AbstractEntity {
  name: string;

  private toRecord(): any {
    return {
      id: this.id,
      name: this['name']
    };
  }
}
